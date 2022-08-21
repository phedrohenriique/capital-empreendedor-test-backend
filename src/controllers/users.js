const connection = require('../connection/connection')

const usersListController = async (request, response) => {
    const data = await connection.database()

    try {
        const users = data["users"]
        return response.status(200).json(users)
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
    }


}

const userInformationController = async (request, response) => {
    const { email } = request.body
    const data = await connection.database()

    try {

        const users = data["users"]
        for (const user of users) {
            if (user.email === email) {
                return response.status(200).json(user)
            }
            else {
                return response.status(404).json(`Error : user not found`)
            }
        }
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
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
        const databaseResponse = await connection.databaseINSERT(newUser, "users")
        if (databaseResponse) {
            return response.status(200).json(databaseResponse)
        }
        else {
            return response.status(500).json("server error, can't create user")
        }
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
    }
}

module.exports = {
    usersListController,
    userInformationController,
    userCreationController
}