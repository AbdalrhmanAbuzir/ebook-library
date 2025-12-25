// const { render } = require("ejs")
const bookModel= require("../models/home_model")


exports.allBookController=(req, res, next)=>{

    bookModel.getAllBooks().then(books=>{
        res.render('books',{
            books:books,
            verfiyLogin:req.session.userid 
        })
    }
    )

}

exports.myBookController=(req, res, next)=>{

    bookModel.getmyBooks(req.session.userid).then(books=>{
        res.render('mybooks',{
            books:books,
            verfiyLogin:req.session.userid 
        })
    }
    )

}

exports.getMyBookUpdateController=(req, res, next)=>{

    bookModel.getMyBooksUpdate(req.params.id).then(book=>{
        res.render('update',{
            book:book,
            verfiyLogin:req.session.userid,
            successMessage:req.flash('successMessage')[0],
            errorMessage:req.flash('errorMessage')[0] 
        })
    }
    )
    // res.render('update',{verfiyLogin:req.session.userid , successMessage :"sss", errorMessage:"aaa" })
}

exports.postMyBookUpdateController=(req, res, next)=>{

    bookModel.updateMyBooks(req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.body.bookid, req.session.userid).then(msg=>{
    
        req.flash('successMessage' , msg)
        res.redirect(`/books/mybooks/update/${req.body.bookid}`);
    }).catch((err)=>{
        // console.log(err)
        req.flash("errorMessage", err)
        res.redirect(`/books/mybooks/update/${req.body.bookid}`);
        
    })

}
exports.myBookDeleteController=(req, res, next)=>{

    let id = req.params.id
    bookModel.deleteMyBooks(id).then(msg=>{
        console.log(msg)
        res.redirect('/books/mybooks')
    }).catch(err=>{
            console.log(err)
        })

}

exports.getAddBookController=(req, res, next)=>{

        res.render('addbooks',{
            verfiyLogin:req.session.userid,
            successMessage:req.flash('successMessage')[0],
            errorMessage:req.flash('errorMessage')[0]

        })
    

}

exports.postAddBookController=(req, res, next)=>{

        // console.log(req.body)
        // console.log(req.file)

    bookModel.postAddBooksModel(req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userid).then((msg)=>{
        // console.log(msg)
        req.flash('successMessage' , msg)
        res.render('addbooks',{verfiyLogin:req.session.userid, successMessage:req.flash('successMessage')[0], errorMessage:req.flash('errorMessage')[0]});
    }).catch((err)=>{
        // console.log(err)
        req.flash("errorMessage", err)
        res.render('addbooks',{verfiyLogin:req.session.userid, successMessage:req.flash('successMessage')[0], errorMessage:req.flash('errorMessage')[0]});
        
    })

}


exports.getBookById=(req, res, next)=>{

    let id =req.params.id
    bookModel.getBookById(id).then(books=>{
    //    console. log 
        console.log(books)
        res.render('detalis',{book:books,
            verfiyLogin:req.session.userid
        })
    }
    )

}





