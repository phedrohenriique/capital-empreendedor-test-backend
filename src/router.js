const { Router } = require('express')
const router = Router()
const users = require('./controllers/users')
const purchases = require('./controllers/purchases')

// all routes and server endpoints

router.get('/server', (request, response) => {
    response.status(200).json("server is running on port : 8800")
})

router.get('/users', users.usersListController)
router.post('/users/user', users.userInformationController)
router.post('/users/create', users.userCreationController)
router.patch('/users/edit', users.userEditController)

router.get("/purchases", purchases.purchasesListController )
router.post('/purchases/purchase', purchases.purchasesInformationController)
router.post('/purchases/create', purchases.purchasesCreationController)

module.exports = router