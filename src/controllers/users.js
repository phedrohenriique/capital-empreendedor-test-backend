const connection = require('../connection/connection')
const tools = require('../tools/functions')

const usersListController = async (request, response) => {
    try {
        const data = await connection.database()
        const users = data["users"]
        return response.status(200).json(users)
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

const userInformationController = async (request, response) => {
    const { id } = request.params
    const idNumber = parseInt(id)

    try {
        const databaseResponse = await connection.databaseSELECT(idNumber, "users")

        // error response in javascript doesnt need to be thrown a variable, like in python languge
        // the error is handled inside the nested promise, the reject() will thro the error if
        // the instance of the object is started inside the function as reject(new Error())

        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(404).json(error.message)
    }
}

const userCreationController = async (request, response) => {
    const { name, email, phone, cpf } = request.body
    const newUser = {
        name,
        email,
        phone,
        cpf
    }

    try {
        if (!newUser.name || !newUser.email || !newUser.phone || !newUser.cpf) {
            throw new tools.ClientError("Client Error, Invalid or Missing Inputs")
        }
        const databaseResponse = await connection.databaseINSERT(newUser, "users")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

const userEditController = async (request, response) => {
    const { id } = request.params
    const idNumber = parseInt(id)
    const { name, email, phone, cpf } = request.body
    let editUser = {
        name,
        email,
        phone,
        cpf
    }

    try {
        const databaseUser = await connection.databaseSELECT(idNumber, "users")
        if (!editUser.name) {
            editUser.name = databaseUser.name
        }
        if (!editUser.email) {
            editUser.email = databaseUser.email
        }
        if (!editUser.phone) {
            editUser.phone = databaseUser.phone
        }
        if (!editUser.cpf) {
            editUser.cpf = databaseUser.cpf
        }
        const databaseResponse = await connection.databaseUPDATE(idNumber, editUser, "users")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

module.exports = {
    usersListController,
    userInformationController,
    userCreationController,
    userEditController
}