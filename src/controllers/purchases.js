const connection = require('../connection/connection')
const tools = require('../tools/functions')

const purchasesListController = async (request, response) => {

    try {
        const data = await connection.database()
        const purchases = data["purchases"]
        return response.status(200).json(purchases)
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

const purchasesInformationController = async (request, response) => {
    const { id } = request.params
    const idNumber = parseInt(id)

    try {
        const databaseResponse = await connection.databaseSELECT(idNumber, "purchases")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(404).json(error.message)
    }
}

const purchasesUserInformationController = async (request, response) => {
    const { id } = request.params
    const idNumber = parseInt(id)

    try {
        const databaseResponse = await connection.databaseSELECT(idNumber, "purchases/user")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(404).json(error.message)
    }
}

const purchasesCreationController = async (request, response) => {
    const { user_id, products } = request.body
    const newPurchase = {
        user_id,
        products,
    }

    try {
        if (!newPurchase.user_id || !products) {
            throw new tools.ClientError("Client Error, Invalid or Missing Inputs")
        }
        const databaseResponse = await connection.databaseINSERT(newPurchase, "purchases")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(500).json(error.message)
    }
}

const purchasesEditController = async (request, response) => {
    const { id } = request.params
    const idNumber = parseInt(id)
    const { products } = request.body
    let editPurchase = {
        products
    }
    try {
        const databasePurchase = await connection.databaseSELECT(idNumber, "purchases")
        if (!editPurchase.products) {
            editPurchase.products = databasePurchase.products
        }
        const databaseResponse = await connection.databaseUPDATE(idNumber, editPurchase, "purchases")
        return response.status(200).json(databaseResponse)
    }
    catch (error) {
        return response.status(404).json(error.message)
    }
}

module.exports = {
    purchasesListController,
    purchasesInformationController,
    purchasesUserInformationController,
    purchasesCreationController,
    purchasesEditController
}