const homeController = require("../controllers/home_controllers")
const router = require('express').Router()


router.get('/', homeController.bookController)

module.exports=router

