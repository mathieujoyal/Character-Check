"use strict"

const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb+srv://mathieujoyal96:shrek@cluster0.vhhwhoa.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true })
const { v4: uuidv4 } = require("uuid")

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
    const { subraceName } = req.params;

    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/subraces/${subraceName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error(`Error fetching subrace ${subraceName} information: ${response.statusText}`);
        }
            const data = await response.json();
            res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getSpecificTrait = async (req, res) => {
    const { trait } = req.params;

    try {
        if (!trait) {
            throw new Error("Trait parameter is missing or undefined.");
        }

        const response = await fetch(`https://www.dnd5eapi.co/api/traits/${trait.toLowerCase()}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${trait}'s information: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = { getRaces, getSpecificRace, getSpecificSubrace, getSpecificTrait }