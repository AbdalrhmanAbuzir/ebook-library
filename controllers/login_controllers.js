// const { Cookie } = require("express-session")
const registerModel= require("../models/register_model")


exports.getLoginPage = (req, res, next)=>{
   
    res.render('login',{
            verfiyLogin:req.session.userid,
            message:req.flash('info')[0]
        }
    )
}


exports.postLoginData=(req, res, next)=>{    
    console.log(req.body)
    
    registerModel.loginFunctionModel(req.body.email, req.body.password).then((id)=>{
        // console.log(id)
        req.session.userid=id
        // console.log(req.session.userid)
        res.redirect('/')
        
    }).catch(err=>{
        console.log(err)
         req.flash('info', err)
         //must use redirect after flash to run flash
        res.redirect('login')
        })
    
}


exports.postLogOut = (req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    });
}
