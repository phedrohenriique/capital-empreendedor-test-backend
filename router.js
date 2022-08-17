const fs = require("fs")
const { Router } = require('express')
const router = Router()
const functions = require('./database/functions')

const dataFile = fs.readFileSync('./database/data.json').toString()

router.get("/", (request, response) => {
    //console.log(dataFile)

    response.status(200).json({ "message": "server is online" })
})

router.get("/users", async (request, response) => {
    try {
        const users = await functions.getAll("users")
        console.log(users)

        response.status(200).json(users)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.get("/purchases", async (request, response) => {
    try {
        const users = await functions.getAll("purchases")
        console.log(users)

        response.status(200).json(users)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router