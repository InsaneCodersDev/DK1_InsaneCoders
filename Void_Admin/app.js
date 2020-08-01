const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session =require('express-session');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');

//passport config
require('./config/passport')(passport);

const app = express();

//Database configuration
const db = require('./config/keys').MongoURI;
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>console.log('Connected Successfully'))
    .catch(err=>console.log(err));

app.use(express.static(__dirname + '/'));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//bodyparser
app.use(express.urlencoded({extended:true}));

// cookie-parser middle ware
app.use(cookieParser());

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge:6000}
  }));
  
  //passport middle ware
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  
  // connect flash middleware
  app.use(flash());
  
  //Global Vars
  app.use((req, res,next)=>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
  
  });

//Routes
app.use('/',require('./routes/admin'));
app.use('/register',require('./routes/registration'));


const PORT = process.env.PORT || 3000;


app.listen(PORT,  console.log(`Server started on port ${PORT}`));