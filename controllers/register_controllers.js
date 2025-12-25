const registerModel= require("../models/register_model")


exports.getRegisterPage = (req, res, next)=>{
   
    res.render('register',{
        verfiyLogin:req.session.userid
    })
}
    

exports.postRegisterData=(req, res, next)=>{    
    console.log(req.body)

    registerModel.registerFunctionModel(req.body.name, req.body.email, req.body.password).then((user)=>{

        res.redirect('login')

    }).catch(err=>console.log(err))

}