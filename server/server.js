"use strict";

const express = require("express")
const port = 4000

const {
getRaces,
getSpecificRace, 
getSpecificSubrace, 
getSpecificTrait, 
registerUser, 
loginUser, 
saveCharacterSheet, 
getSheetsByUserId, 
getSheetDetails, 
sendPasswordRecoveryEmail, 
forgotPassword
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

.get("/api/sheets/:userId", async (req, res) => {
    const userId = req.params.userId

    try {
        const sheets = await getSheetsByUserId(userId)
        if (!sheets) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(sheets)
    } catch (error) {
        console.error('Error fetching sheets:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

.get('/api/sheets/details/:sheetId', getSheetDetails)

.post('/api/sheets', saveCharacterSheet)

.post("/api/register", registerUser)

.post("/api/login", loginUser)

.post("/api/password-recovery", sendPasswordRecoveryEmail)

.post('/api/forgotPassword', forgotPassword)

//-------------------------------------------------//
    // Add my endpoints over this line.

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Look at you, on the server page and stuff..  "
        })
    })


    .listen(port, () => console.log('Listening on port 4000, Get to work.'))