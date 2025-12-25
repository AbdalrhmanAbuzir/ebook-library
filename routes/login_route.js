const registerController = require("../controllers/login_controllers")
const router = require('express').Router()
const body = require('express').urlencoded({extended:true})

router.get('/', registerController.getLoginPage)


router.post('/', body,registerController.postLoginData)

router.post('/logout', body,registerController.postLogOut)

module.exports=router

