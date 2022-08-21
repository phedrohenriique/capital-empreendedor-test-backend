const fs = require('fs')
const path = require('path') // handler for file directory path
const databaseFile = `./database.json` // file simulating database object
const tools = require('../tools/functions') // tools for required functions

// database file to simulate pool connection, all related content with the data will be written here
// file reading, writing and update, all functions returning a promise, to be used in routes

const database = () => {
    const objectPromise = new Promise((resolve, reject) => {
        try {
            const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
            resolve(data)
        }
        catch (error) {
            reject(error)
        }
    })
    return objectPromise
}

const databaseINSERT = (insertData, table) => {
    const objectPromise = new Promise((resolve, reject) => {

        try {
            if (table === "users") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                const information = data["information"]
                const userId = tools.userIdGenerator(information.id_generator)

                let dataUpdate = insertData
                dataUpdate.id = userId
                dataUpdate = tools.userDataOrganized(dataUpdate)
                data[table].push(dataUpdate)

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, users: [...data[table]], information: { ...data["information"], id_generator: userId } }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file
                resolve(dataUpdate)

            }
            if (table === "purchases") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))

                let dataUpdate = insertData
                data[table].push(dataUpdate)

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, purchases: [...data[table]], }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file
                resolve(dataUpdate)

            }
            if (table === "products") {

            }
            else {
                console.log("server error")
                reject(null)
            }
        }
        catch (error) {
            reject(error)
        }
    })
    return objectPromise
}

const databaseUPDATE = (updateData, table) => {
    const objectPromise = new Promise((resolve, reject) => {
        try {
            if (table === "users") {
                const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, databaseFile)))
                let usersList = data[table]
                let userUpdated = {}
                usersList.forEach((element, index, array) => {
                    if (element.email === updateData.email) {
                        array[index] = { ...element, ...updateData }
                        userUpdated = { ...element, ...updateData }
                    }
                });

                fs.writeFileSync("./src/connection/database.json", JSON.stringify({ ...data, users: [...usersList] }, null, '\t')) // null and '\t' parameters after writing are to generate a readable json file

                console.log(userUpdated)
                resolve(userUpdated)
            }
        }
        catch (error) {
            reject(error)
        }
    })

    return objectPromise
}

const databaseDELETE = () => {
    const objectPromise = new Promise((resolve, reject) => {

    })

    return objectPromise
}

module.exports = {
    database,
    databaseINSERT,
    databaseUPDATE
}