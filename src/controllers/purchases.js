const connection = require('../connection/connection')

const purchasesListController = async (request, response) => {
    const data = await connection.database()

    try {
        const purchases = data["purchases"]
        return response.status(200).json(purchases)
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
    }
}

const purchasesInformationController = async (request, response) => {
    const { email } = request.body
    const data = await connection.database()

    try {

        const purchases = data["purchases"]
        for (const purchase of purchases) {
            if (purchase.user_email === email) {
                return response.status(200).json(purchase)
            }
            else {
                return response.status(404).json(`Error : purchase not found`)
            }
        }
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
    }
}

const purchasesCreationController = async (request, response) => {
    const { user_id, user_email, products } = request.body
    const newPurchase = {
        user_id,
        user_email,
        products,
    }

    try {
        const databaseResponse = await connection.databaseINSERT(newPurchase, "purchases")
        if (databaseResponse) {
            return response.status(200).json(databaseResponse)
        }
        else {
            return response.status(500).json("server error, can't create purchase")
        }
    }
    catch (error) {
        console.log(`there was an error : ${error} `)
        return response.status(500).json(error)
    }
}

module.exports = {
    purchasesListController,
    purchasesInformationController,
    purchasesCreationController
}