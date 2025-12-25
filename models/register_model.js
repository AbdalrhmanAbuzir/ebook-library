const mongoose = require("mongoose")
// const { resolve } = require("path")
const bcrypt=require('bcrypt')

const registerSchima = mongoose.Schema({
    name:String,
    email:String,
    password:String
})


let User = mongoose.model('user', registerSchima)
const url = "mongodb://localhost:27017/library"

exports.registerFunctionModel=(name, email, password)=>{
    
    return new Promise((resolve, reject)=>{
        
        mongoose.connect(url).then(()=>{

            return User.findOne({email:email})

        }).then((user)=>{
                if(user){
                    mongoose.disconnect()
                    reject('email is used')
                }else{
                    return bcrypt.hash(password, 10)
                }
            }).then((hpassword)=>{
                let user= new User({
                    name:name,
                    email:email,
                    password:hpassword
                })
                return user.save()
                
            }).then((user)=>{
                mongoose.disconnect()
                resolve("registered")
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
}



exports.loginFunctionModel=(email, password)=>{
    
    return new Promise((resolve, reject)=>{
        
        mongoose.connect(url).then(()=>{

            return User.findOne({email:email})

        }).then((user)=>{
                if(!user){
                    mongoose.disconnect()
                    reject('the email is wrong')
                }else{
                    // console.log("before" + user)
                    return bcrypt.compare(password,user.password )
                }
            }).then((verfiy)=>{
                console.log(verfiy);
                if(verfiy){
                    User.findOne({email:email}).then((user)=>{
                        // console.log(`this is ${user}`)
                        mongoose.disconnect();
                        resolve(user.id)
                    })
                    
                }else{
                    mongoose.disconnect();
                    reject('invalid password')
                }
                
            // }).then((user)=>{
            //     mongoose.disconnect()
            //     resolve("registered")
            
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
        })
}

