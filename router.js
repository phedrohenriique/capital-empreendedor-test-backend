const fs = require("fs")
const { Router } = require('express')
const router = Router()

router.get("/", (request, response) => {
    //console.log(dataFile)

    response.status(200).json({ "message": "server is online" })
})

////////////////////////// users routes

router.get("/users", async (request, response) => {
    try {
        const usersList = await functions.getAll("users")
        console.log("users list : ", usersList)

        response.status(200).json(usersList)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.post("/users/create", async (request, response) => {

    const { email, name, isActive, phone, revenue, agreedTerms } = request.body

    const object = {
        name,
        email,
        isActive,
        phone,
        revenue,
        agreedTerms
    }

    try {
        const user = await functions.set("users", email, object)
        await functions.set("purchases", email, { products: [] })
        console.log(`user ${user.email} created`)

        response.status(200).json(user)

    }
    catch (error) {
        response.status(500).json(error)
    }

})

router.post("/users/user", async (request, response) => {

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

////////////////////////// purchases routes

router.get("/purchases", async (request, response) => {
    try {
        const purchasesList = await functions.getAll("purchases")
        console.log("purchases list : ", purchasesList)

        response.status(200).json(purchasesList)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.post("/purchases/create", async (request, response) => {

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
        const purchases = await functions.set("purchases", email, productsUpdated)
        console.log(`purchases list was updated with data : ${purchases.products}`)

        response.status(200).json(purchases)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

router.post("/purchases/user", async (request, response) => {
    const { email } = request.body
    try {
        const products = await functions.getOne("purchases", email)
        console.log(`user ${email} has products list ${products}`)

        response.status(200).json(products)
    }
    catch (error) {
        response.status(500).json(error)
    }
})


router.delete("/purchases/delete", async (request, response) => {

    const { email } = request.body


    try {
        await functions.delete("purchases", email)
        await functions.set("purchases", email, { products: [] })
        console.log(`user ${email} products list was deleted`)

        response.status(200).json(`user ${email} products list was deleted`)
    }
    catch (error) {
        response.status(500).json(error)
    }
})

module.exports = router