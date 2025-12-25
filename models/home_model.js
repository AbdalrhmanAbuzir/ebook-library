const mongoose = require("mongoose")
// const { resolve } = require("path")

const SchemaBook = mongoose.Schema({
    _id:{ type: mongoose.Schema.Types.ObjectId },
    // _id: new mongoose.Types.ObjectId(),
    title:String,
    description:String,
    author:String,
    price:Number,
    image:String,
    userid:String
})

let book = mongoose.model("book", SchemaBook)
const url = "mongodb://localhost:27017/library"

exports.getThreeBooks=()=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
        return book.find({}).limit(3)
        
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)
        
    }).catch(er=>reject(er))

    })

}


exports.getAllBooks=()=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
        return book.find({})
        
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)

    }).catch(er=>reject(er))

    })

}

exports.getBookById=(id)=>{

    return new Promise((resolve, reject)=>{
        
        console.log(id)
        mongoose.connect(url).then( async()=>{       
            // return book.findById("6836a44768dce42b5d3f8a73")
            try {
                let bb = await book.findById(id)
                console.log(bb);
                return bb;
            } catch (error) {
                console.log(error)
            }
            // return book.findById(id)


    }).then(books=>{
        mongoose.disconnect()
        resolve(books)

    }).catch(er=>reject(er))

    })

}

exports.postAddBooksModel = (title, description, author, price, image, userid) =>{
return new Promise((resolve, reject)=>{
    
    // console.log(userid)
        mongoose.connect(url).then(()=>{
            let Book = new book ({
                // this line to avoid message " must have an id before saving"
                _id: new mongoose.Types.ObjectId(),
                title:title,
                description:description,
                author:author,
                price:price,
                image:image,
                userid:userid
            })
            return Book.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve("the book is added")
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
 })

}


exports.getmyBooks=(userid)=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
        return book.find({userid:userid})
        
    }).then(books=>{
        mongoose.disconnect()
        resolve(books)

    }).catch(er=>reject(er))

    })

}

exports.getMyBooksUpdate=(bookid)=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
        return book.findOne({_id:bookid})
        
    }).then(book=>{
        mongoose.disconnect()
        resolve(book)

    }).catch(er=>reject(er))

    })

}

exports.updateMyBooks=(title, description, author, price, filename, bookid, userid)=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
            return  book.updateOne ({_id:bookid},{
                // this line to avoid message " must have an id before saving"
                _id: bookid,
                title:title,
                description:description,
                author:author,
                price:price,
                image:filename,
                userid:userid
            })
        }).then(()=>{
            mongoose.disconnect()
            resolve("the book is updated")
        }).catch((err)=>{
            mongoose.disconnect()
            // console.log(err)
            reject(err)
        })
})
}

exports.deleteMyBooks=(userid)=>{
    return new Promise((resolve, reject)=>{
    
        mongoose.connect(url).then(()=>{
        return book.deleteOne({_id:userid})
        
    }).then(msg=>{
        console.log(msg)
        mongoose.disconnect()
        resolve("the book is deleted")

    }).catch(er=>reject(er))

    })

}




