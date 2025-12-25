const express = require("express")
const path = require("path")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const homerouter= require('./routes/home_route')
const bookrouter= require('./routes/book_route')
const registerrouter= require('./routes/register_route')
const loginrouter= require('./routes/login_route')

const app = express();

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/library',
  collection: 'mySessions'
});

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true

}));

app.use(flash());

app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use("/",homerouter)

app.use("/books",bookrouter);

app.use("/register", registerrouter);

app.use("/login", loginrouter);

app.get("/contact",(req, res, next)=>{
  res.render("contact",{verfiyLogin:req.session.userid})
  
});

// app.get("/mybooks",(req, res, next)=>{
//   res.render("mybooks",{verfiyLogin:req.session.userid})
  
// });

// app.get("/addbooks",(req, res, next)=>{
//   res.render("addbooks",{verfiyLogin:req.session.userid})
  
// });
// app.get("/detalis",(req,res,next)=>{
  //     res.render('detalis')
// });


// app.get("/books",(req, res, next)=>{
//     res.render("books")

// });

app.get("/about",(req, res, next)=>{
    res.render("about",{verfiyLogin:req.session.userid})

});

app.listen(3000, ()=> console.log("server run in server 3000"))


// app.use((req,res)=>{
//   req.session.destroy()
// })