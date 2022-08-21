
function userIdGenerator(number) {
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

module.exports = {
    userIdGenerator,
    userDataOrganized
}