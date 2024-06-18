const {Router} = require('express')
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/userAuthentication')
const route = Router()

route.post('/post',userController.createUser)
route.get('/login',userController.loginUser)
route.get('/view',userController.viewUser)
route.get('/viewAll',userController.viewAllUser)
route.put('/update/:id',userController.updateUser)
route.get('/authentication',authentication,userController.userAuthentication)

module.exports=route