const registerController = require("../controllers/register_controllers")
const router = require('express').Router()
const body = require('express').urlencoded({extended:true})

router.get('/', registerController.getRegisterPage)


router.post('/', body,registerController.postRegisterData)

module.exports=router

