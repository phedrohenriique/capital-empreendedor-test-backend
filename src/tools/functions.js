
function databaseIdGenerator(number) {
    return number + 1
}

function userDataOrganized(object) {
    const organizedObject = {
        id: object.id,
        name: object.name,
        email: object.email,
        phone: object.phone,
        cpf: object.cpf
    }

    return organizedObject
}

function purchaseDataOrganized(object) {
    const organizedObject = {
        purchase_id: object.purchase_id,
        user_id: object.user_id,
        products: object.products
    }

    return organizedObject
}

function ServerError(message) {
    this.message = message
    this.name = "ServerError"
}

function ClientError(message) {
    this.message = message
    this.name = "ClientError"
}

module.exports = {
    databaseIdGenerator,
    userDataOrganized,
    purchaseDataOrganized,
    ServerError,
    ClientError
}