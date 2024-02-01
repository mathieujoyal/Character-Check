"use strict"

const { MongoClient } = require("mongodb")
const { v4: uuidv4 } = require("uuid")

const options = { useUnifiedTopology: true };
const MONGO_URI = "mongodb+srv://mathieujoyal96:admincheck@charactercheck.4y7exrh.mongodb.net/?retryWrites=true&w=majority"

const registerUser = async (req, res) => {
    const { account, userPassword } = req.body

    if (!account || !userPassword) {
        return res.status(400).json({ error: 'account and userPassword are required' })
    }
    let client
    try {
        client = new MongoClient(MONGO_URI, options)
        await client.connect()
        const existingUser = await client.db('CharacterCheck').collection('Accounts').findOne({ account })
        if (existingUser) {
            return res.status(400).json({ error: 'account already exists' })
        }

        const userId = uuidv4();
        await client.db('CharacterCheck').collection('Accounts').insertOne({ userId, account, userPassword })

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

const loginUser = async (req, res) => {
    const { account, userPassword } = req.body;

    if (!account || !userPassword) {
        return res.status(400).json({ error: 'account and userPassword are required' });
    }

    let client;
    try {
        client = new MongoClient(MONGO_URI, options);
        await client.connect();

        const user = await client.db('CharacterCheck').collection('Accounts').findOne({ account, userPassword });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (client) {
            await client.close();
        }
    }
};


module.exports = { getRaces, getSpecificRace, getSpecificSubrace, getSpecificTrait, registerUser, loginUser }