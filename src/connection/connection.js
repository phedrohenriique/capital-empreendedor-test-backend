const fs = require('fs')
const path = require('path') // handler for file directory path
const databaseFile = `./database.json` // file simulating database object
const tools = require('../tools/functions') // tools for required functions

// database file to simulate pool connection, all related content with the data will be written here
// file reading, writing and update, all functions returning a promise, to be used in routes

// the throw errors are used here to make the code flow into the catch block
// the error handler happens in the main controller

const database = () => {
    const objectPromise = new Promise((resolve, reject) => {
        try {
            const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
            resolve(data)
        }
        catch {
            reject(new tools.ServerError("Connection Server Error"))
        }
    })
    return objectPromise
}

const databaseSELECT = (id, table) => {
    const objectPromise = new Promise((resolve, reject) => {
        try {
            if (table === "users") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const users = data[table]
                const user = users.find((user) => {
                    return user.id === id
                })

                // can use for loop for better performance in the code
                // for (const user of users) {
                //     if (user.id === id) {
                //         resolve(user)
                //     }
                // }

                if (!user) {
                    throw new tools.ServerError("Connection Server Error")
                }
                resolve(user)
            }
            if (table === "purchases") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const purchases = data[table]
                const purchase = purchases.find((purchase) => {
                    return purchase.purchase_id === id
                })

                // can use for loop for better performance in the code
                // for (const user of users) {
                //     if (user.id === id) {
                //         resolve(user)
                //     }
                // }

                if (!purchase) {
                    throw new tools.ServerError("Connection Server Error")
                }
                resolve(purchase)
            }
            if (table === "purchases/user") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const purchases = data["purchases"]
                let userPurchases = []
                purchases.forEach((purchase) => {
                    if (purchase.user_id === id) {
                        userPurchases.push(purchase)
                    }
                })

                // user may not have yet purchased anything so there
                // won't be an error for that, instead an empty array returned
                // if (userPurchases.length === 0) {
                //     throw new tools.ServerError("Connection Server Error")
                // }

                resolve(userPurchases)

            }
            if (table === "products") {
            }
            else {
                throw new tools.ServerError("Connection Server Error")
            }
        }
        catch {
            reject(new tools.ServerError("Connection Server Error")) // already sending an error instance to the controrller, it will go to the catch block in the upper function automatically
        }
    })
    return objectPromise
}

const databaseINSERT = (insertData, table) => {
    const objectPromise = new Promise((resolve, reject) => {

        try {
            if (table === "users") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const idGenerator = data["information"]["id_generator"]
                const userId = tools.databaseIdGenerator(idGenerator.user_id)

                let dataUpdate = insertData
                dataUpdate.id = userId
                dataUpdate = tools.userDataOrganized(dataUpdate)
                data[table].push(dataUpdate)

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, users: [...data[table]], information: { id_generator: { ...idGenerator, user_id: userId } } }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file
                resolve(dataUpdate)

            }
            if (table === "purchases") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const idGenerator = data["information"]["id_generator"]
                const purchaseId = tools.databaseIdGenerator(idGenerator.purchase_id)

                let dataUpdate = insertData
                dataUpdate.purchase_id = purchaseId
                dataUpdate = tools.purchaseDataOrganized(dataUpdate)
                data[table].push(dataUpdate)

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, purchases: [...data[table]], information: { id_generator: { ...idGenerator, purchase_id: purchaseId } } }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file
                resolve(dataUpdate)

            }
            if (table === "products") {

            }
            else {
                throw new tools.ServerError("Connection Server Error")
            }
        }
        catch (error) {
            reject(new tools.ServerError("Connection Server Error"))
        }
    })
    return objectPromise
}

const databaseUPDATE = (id, updateData, table) => {
    const objectPromise = new Promise((resolve, reject) => {
        try {
            if (table === "users") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                let usersList = data[table]
                let userUpdated = {}
                usersList.forEach((element, index, array) => {
                    if (element.id === id) {
                        array[index] = tools.userDataOrganized({ ...element, ...updateData })
                        userUpdated = tools.userDataOrganized({ ...element, ...updateData })
                    }
                });

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, users: [...usersList] }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file
                resolve(userUpdated)
            }
            if (table === "purchases") {

            }
            if (table === "products") {

            }
            else {
                throw new tools.ServerError("Connection Server Error")
            }
        }
        catch (error) {
            reject(new tools.ServerError("Connection Server Error"))
        }
    })

    return objectPromise
}

const databaseDELETE = () => {
    const objectPromise = new Promise((resolve, reject) => {
        try {

        }
        catch (error) {
            reject(new tools.ServerError("Connection Server Error"))
        }
    })

    return objectPromise
}

module.exports = {
    database,
    databaseSELECT,
    databaseINSERT,
    databaseUPDATE
}