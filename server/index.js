"use strict";

const express = require("express");
const port = 4000

express()

    .use(express.json())

    .use(express.static("public"))

    // Add my handlers under this line.
//-------------------------------------------------//

//-------------------------------------------------//
    // Add my handlers over this line.

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Look at you, on the server page and stuff..  ",
        });
    })


    .listen(port, () => console.log('Listening on port 4000, Get to work.'));