const homeModel= require("../models/home_model")

exports.bookController=(req, res, next)=>{

    homeModel.getThreeBooks().then(books=>{
        res.render('index',{
            books:books,
            verfiyLogin:req.session.userid
        })
    }
    )

}

// exports.allBookController=(req, res, next)=>{

//     homeModel.getAllBooks().then(books=>{
//         res.render('books',{books:books})
//     }
//     )

// }