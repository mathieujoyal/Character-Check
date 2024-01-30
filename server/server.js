"use strict";

const express = require("express")
const port = 4000

const {
getRaces, getSpecificRace, getSpecificSubrace, getSpecificTrait, signUpUser
} = require("./handlers")

express()

    .use(express.json())

    .use(express.static("public"))

    // Add my endpoints under this line.
//-------------------------------------------------//

.get("/api/races", async (req, res) => {
    try {
        const races = await getRaces()
        res.json(races)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
})

.get("/api/races/:raceName", getSpecificRace)

.get("/api/subraces/:subraceName", getSpecificSubrace)

.get("/api/traits/:trait", getSpecificTrait)

.post("/api/signup", signUpUser)

//-------------------------------------------------//
    // Add my endpoints over this line.

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Look at you, on the server page and stuff..  ",
        })
    })


    .listen(port, () => console.log('Listening on port 4000, Get to work.'))