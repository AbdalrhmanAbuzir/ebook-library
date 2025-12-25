const bookController = require("../controllers/book_controllers")
const router = require('express').Router()
const guardAuth = require('./guardAuth')
const multer = require('multer')

router.get('/', guardAuth.isAuth, bookController.allBookController)

router.get('/mybooks', guardAuth.isAuth, bookController.myBookController)

router.get('/mybooks/update/:id', guardAuth.isAuth, bookController.getMyBookUpdateController)

router.post('/mybooks/update', guardAuth.isAuth,multer({
  storage:multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
}).single('image'), bookController.postMyBookUpdateController)

router.get('/mybooks/delete/:id', guardAuth.isAuth, bookController.myBookDeleteController)

router.get('/addbooks', guardAuth.isAuth, bookController.getAddBookController)

router.post('/addbooks', guardAuth.isAuth, multer({
    storage:multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
}).single('image'), bookController.postAddBookController)

router.get('/:id', bookController.getBookById)

module.exports=router

