"use strict"

const { MongoClient } = require("mongodb")
const { v4: uuidv4 } = require("uuid")

const options = { useUnifiedTopology: true };
const MONGO_URI = "mongodb+srv://mathieujoyal96:shrek1234@charactercheck.mcyyprm.mongodb.net/?retryWrites=true&w=majority"

const signUpUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' })
    }
    let client
    try {
        client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const existingUser = await client.db('Character_sheets').collection('Accounts').findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        const userId = uuidv4();
        await client.db('Character_sheets').collection('Accounts').insertOne({ userId, email, password })

        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getRaces = async () => {
    try {
        const response = await fetch("https://www.dnd5eapi.co/api/races")
        const data = await response.json();
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
            throw new Error(`Error fetching race ${raceName} information: ${response.statusText}`)
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getSpecificSubrace = async (req, res) => {
    const { subraceName } = req.params

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/subraces/${subraceName.toLowerCase()}`)
        if (!response.ok) {
            throw new Error(`Error fetching subrace ${subraceName} information: ${response.statusText}`)
        }
            const data = await response.json()
            res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const getSpecificTrait = async (req, res) => {
    const { trait } = req.params

    try {
        if (!trait) {
            throw new Error("Trait parameter is missing or undefined.");
        }

        const response = await fetch(`https://www.dnd5eapi.co/api/traits/${trait.toLowerCase()}`)
        if (!response.ok) {
            throw new Error(`Error fetching ${trait}'s information: ${response.statusText}`)
        }
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


module.exports = { getRaces, getSpecificRace, getSpecificSubrace, getSpecificTrait, signUpUser }