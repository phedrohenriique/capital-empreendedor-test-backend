const fs = require("fs")
const { Router } = require('express')
const router = Router()
const functions = require('./database/functions')

const dataFile = fs.readFileSync('./database/data.json').toString()

router.get("/", (request, response) => {
    //console.log(dataFile)

    response.status(200).json({ "message": "server is online" })
})

////////////////////////// users routes

router.get("/users", async (request, response) => {
    try {
        const usersList = await functions.getAll("users")
        console.log(usersList)

        response.status(200).json(usersList)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.post("/users/user_email", async (request, response) => {
    const { email } = request.body
    try {
        const user = await functions.getOne("users", email)
        console.log(user)

        response.status(200).json(user)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.patch("/users/user_email", async (request, response) => {

    const { email, name, isActive, phone, revenue, agreedTerms } = request.body

    const object = {
        name,
        isActive,
        phone,
        revenue,
        agreedTerms
    }

    try {
        const user = await functions.set("users", email, object)
        console.log("data added")

        response.status(200).json(user)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

////////////////////////// purchases routes

router.get("/purchases", async (request, response) => {
    try {
        const purchasesList = await functions.getAll("purchases")
        console.log(purchasesList)

        response.status(200).json(purchasesList)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.post("/purchases/user_email", async (request, response) => {
    const { email } = request.body
    try {
        const products = await functions.getOne("purchases", email)
        console.log(products)

        response.status(200).json(products)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.patch("/purchases/user_email", async (request, response) => {

    const { email, name, limit, interest, term, isActive } = request.body
    const productsObject = await functions.getOne("purchases", email)
    const { products } = productsObject // object array

    const object = {
        name,
        limit,
        interest,
        term,
        isActive
    }

    const productsUpdated = { products: [...products, object] }

    try {
        const user = await functions.set("purchases", email, productsUpdated)
        console.log("data added")

        response.status(200).json(user)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.delete("/purchases/user_email", async (request, response) => {

    const { email } = request.body


    try {
        await functions.delete("purchases", email)
        await functions.set("purchases", email, { products: [] })
        console.log("data deleted")

        response.status(200).json("data deleted")
    }
    catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router