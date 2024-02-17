"use strict"

const { MongoClient, ObjectId  } = require("mongodb")
const { v4: uuidv4 } = require("uuid")
const options = { useUnifiedTopology: true };
const MONGO_URI = "mongodb+srv://mathieujoyal96:admincheck@charactercheck.4y7exrh.mongodb.net/?retryWrites=true&w=majority"

const getRaces = async () => {
    try {
        const response = await fetch("https://www.dnd5eapi.co/api/races")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error, could not retrieve races", error)
        throw error
    }
}

const getSpecificRace = async (req, res) => {
    const { raceName } = req.params
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/races/${raceName.toLowerCase()}`)
        if (!response.ok) {
            throw new Error(`Error fetching ${raceName}'s informations: ${response.statusText}`)
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })
    }
}

const getSpecificSubrace = async (req, res) => {
    const { subraceName } = req.params
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/subraces/${subraceName.toLowerCase()}`)
        if (!response.ok) {
            throw new Error(`Error fetching ${subraceName}'s information: ${response.statusText}`)
        }
            const data = await response.json()
            res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })
    }
}

const getSpecificTrait = async (req, res) => {
    const { trait } = req.params
    try {
        if (!trait) {
            throw new Error("Trait is missing or undefined.")
        }
        const response = await fetch(`https://www.dnd5eapi.co/api/traits/${trait.toLowerCase()}`)
        if (!response.ok) {
            throw new Error(`Error fetching ${trait}'s information: ${response.statusText}`)
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })
    }
}

const registerUser = async (req, res) => {
    const { account, userPassword, userEmail } = req.body
    if (!account || !userPassword) {
        return res.status(400).json({ error: 'Account and Password are required.' })
    }
    if (userPassword.value < 8 || userPassword.value > 20 ){
        return res.status(400).json({ error: 'Invalid password' })
    }
    let client
    try {
        client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const existingUser = await client.db('CharacterCheck').collection('Accounts').findOne({ account })
        if (existingUser) {
            return res.status(400).json({ error: 'This account already exists' })
        }
        const userId = uuidv4()
        await client.db('CharacterCheck').collection('Accounts').insertOne({
            userId,
            account,
            userPassword,
            userEmail,
            savedSheets: []
        })

        res.status(201).json({ message: 'Account created successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const loginUser = async (req, res) => {
    const { account, userPassword } = req.body
    if (!account || !userPassword) {
        return res.status(400).json({ error: 'Account and Password are required.' })
    }
    let client
    try {
        client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const user = await client.db('CharacterCheck').collection('Accounts').findOne({ account, userPassword })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        res.status(200).json({ message: 'Login successful', userId: user.userId })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    } 
}

const deleteAccount = async (req, res) => {
    try {
        const { username, loggedInUserId } = req.body
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const user = await client.db('CharacterCheck').collection('Accounts').findOne({ account: username })
        if (!user || user.userId !== loggedInUserId) {
            return res.status(403).json({ error: 'Unauthorized' })
        }
        await client.db('CharacterCheck').collection('Accounts').deleteOne({ account: username })
        await client.close()
        res.status(200).json({ message: 'Account deleted successfully' })
    } catch (error) {
        console.error('Error during account deletion:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

const getSheetDetails = async (req, res) => {
    const sheetId = req.params.sheetId
    try {
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const sheet = await client.db('CharacterCheck').collection('Sheets').findOne({ _id: ObjectId(sheetId) })
        if (!sheet) {
        return res.status(404).json({ error: 'Sheet not found' })
        }
        res.status(200).json(sheet)
    } catch (error) {
        console.error('Error fetching sheet details:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

const getSheetsByUserId = async (userId) => {
    try {
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const user = await client.db('CharacterCheck').collection('Accounts').findOne({ userId })
        if (!user) {
            return null
        }
        const sheets = await client.db('CharacterCheck').collection('Sheets').find({_id: { $in: user.savedSheets },}).toArray()
        return sheets
    } catch (error) {
        console.error('Error fetching sheets:', error)
        throw error
    }
}

const saveCharacterSheet = async (req, res) => {
    try {
        const userId = req.headers.authorization
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const characterData = req.body
        if (!characterData.characterName.trim()) {
            return res.status(400).json({ error: 'Character Name is required' })
        }
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const result = await client.db('CharacterCheck').collection('Sheets').insertOne({
            userId: userId, 
            ...characterData
        })
        await client.db('CharacterCheck').collection('Accounts').updateOne(
            { userId: userId },
            { $push: { savedSheets: result.insertedId } }
        )
        await client.close()
        res.status(200).json({ sheetId: result.insertedId })
    } catch (error) {
        console.error('Error during sheet save:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const updateCharacterSheet = async (req, res) => {
    try {
        const { sheetId } = req.params
        const updatedCharacterData = req.body
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const result = await client.db('CharacterCheck').collection('Sheets').updateOne(
            { _id: ObjectId(sheetId)},
            { $set: { ...updatedCharacterData, _id: ObjectId(sheetId) } }
        )
        await client.close()
        if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Character sheet not found' })
        }
        res.status(200).json({ message: 'Character sheet updated successfully' })
    } catch (error) {
        console.error('Error during sheet update:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

const deleteCharacterSheet = async (req, res) => {
    try {
        const userId = req.headers.authorization
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }
        const { sheetId } = req.params
        const client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const result = await client.db('CharacterCheck').collection('Sheets').deleteOne({
            _id: ObjectId(sheetId),
            userId: userId
        })
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Character sheet not found' })
        }
        await client.db('CharacterCheck').collection('Accounts').updateOne(
            { userId: userId },
            { $pull: { savedSheets: ObjectId(sheetId) } }
        )
        await client.close()
        res.status(200).json({ message: 'Character sheet deleted successfully' })
    } catch (error) {
        console.error('Error during sheet deletion:', error)
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = { 
getRaces,
getSpecificRace, 
getSpecificSubrace, 
getSpecificTrait, 

registerUser, 
loginUser, 
deleteAccount,

getSheetDetails, 
getSheetsByUserId,
saveCharacterSheet,
updateCharacterSheet,
deleteCharacterSheet
}