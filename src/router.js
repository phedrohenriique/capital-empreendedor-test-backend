const { Router } = require('express')
const router = Router()
const users = require('./controllers/users')
const purchases = require('./controllers/purchases')

// all routes and server endpoints

router.get('/server', (request, response) => {
    response.status(200).json("server is running on port : 8800")
})

router.get('/users', users.usersListController)
router.get('/users/user/:id', users.userInformationController)
router.post('/users/create', users.userCreationController)
router.patch('/users/user/:id', users.userEditController)

router.get("/purchases", purchases.purchasesListController)
router.get('/purchases/purchase/:id', purchases.purchasesInformationController)
router.get('/purchases/user/:id', purchases.purchasesUserInformationController)
router.post('/purchases/create', purchases.purchasesCreationController)
router.patch('/purchases/purchase/:id', purchases.purchasesEditController)

module.exports = router