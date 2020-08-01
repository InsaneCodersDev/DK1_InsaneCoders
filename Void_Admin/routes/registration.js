const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const multer = require('multer');
const firebase = require('firebase');
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

//Importing model
const User = require('../models/Users');




// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDu0psXvljZiA_oDYYYac03ogOAkrL2gyY",
  authDomain: "to-do-list-1a014.firebaseapp.com",
  databaseURL: "https://to-do-list-1a014.firebaseio.com",
  projectId: "to-do-list-1a014",
  storageBucket: "to-do-list-1a014.appspot.com",
  messagingSenderId: "559485359472",
  appId: "1:559485359472:web:89266c4ffbbf501760abb5",
  measurementId: "G-QBJ1XT4EGX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Storage Strategy
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./img/');
    },
    filename: function(req,file,cb){
        cb(null,req.body.username + ".jpg");
    }
});

const upload = multer({storage: storage});

//Loading Resgistration page for new employ
router.get('/',(req,res)=>{
    res.render('register');
});

//Registering a new employ
router.post('/',  upload.single('img_url'), (req,res,next)=>{
    const {name, phn, email,username, password, password2,department,designation,dob} = req.body;
    const image_url = username + '.jpg';
    let errors = [];
    if(!name || !phn || !email || !department || !dob || !designation || !username || !password || !password2){
        // console.log('hello');
        errors.push({msg : 'Please fill in all fields'});
    }
    if(password !== password2){
        // console.log(password);
        // console.log(password2);
        errors.push({msg:'Password do not match'});
    }
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    }
    if(!(phn.length = 10)){
        errors.push({msg:'Please enter a 10 digit Phone number'});
    }
    if(errors.length >0){
    //  console.log('run ho raha hai');
     res.render('register',{
         errors,
         name,
         phn,
         email,
         username,
         password,
         password2,
         department,
         designation,
         dob
     });
    } else{
        // validation passed
        User.findOne({email:email})
            .then(user => {
                if(user){
                    // email exist
                    errors.push({msg: 'Email is already registered'});
                    res.render('register',{
                        errors,
                        name,
                        phn,
                        email,
                        username,
                        password,
                        password2,
                        department,
                        designation,
                        dob
                    });
                } else{
                    User.findOne({username:username})
                        .then(user =>{
                            if(user){
                                //username exist
                                errors.push({msg: 'Username is already registered'});
                                res.render('register',{
                                    errors,
                                    name,
                                    phn,
                                    email,
                                    username,
                                    password,
                                    password2,
                                    department,
                                    designation,
                                    dob
                                });
                            }
                            else{
                                // Hash Password
                                User.find().sort({'_id':-1}).limit(1)
                                    .then(user=>{
                                        console.log(user);
                                        const userid = parseInt(user[0].userid) + 1;
                                        const newUser =  new User({
                                            errors,
                                            name,
                                            phn,
                                            email,
                                            username,
                                            userid,
                                            password,
                                            department,
                                            designation,
                                            dob,
                                            image_url
                                        });
                                        bcrypt.genSalt(10, (err,salt)=> {
                                            bcrypt.hash(newUser.password, salt,(err,hash)=>{
                                                if(err) throw err;
                                                // setting hash  password
                                                 firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).catch(function(error) {
                                                    // Handle Errors here.
                                                    var errorCode = error.code;
                                                    var errorMessage = error.message;
                                                    console.log(email);
                                                  });
                                                 newUser.password = hash;
                                                 newUser.save()
                                                    .then(user => {
                                                        // console.log('done');
                                                        res.redirect(307,'/dashboard');
                        
                                                    })
                                                    .catch(err => console.log(err));
                                            });
                                        });
                                    }).catch(err=>console.log(err));
                            }
                        });

                        }
                    });
                }
            });

router.put('/',jsonParser,(req,res)=>{
    const username=req.body.username;
    const otp = parseInt(req.body.otp);
    let error= [];
    User.findOne({username:username})
        .then(user=>{
            console.log(user);
            if(user === null){
                error.push('Please register the user');
                res.json(error);
            } else{
                const newOtp = new Otp({
                    username,
                    otp
                });
                newOtp.save()
                    .then(user=>{
                        res.render('register',{username});
                    }).catch(err=>console.log(err));
            }
        }).catch(err=>console.log(err));
});

module.exports = router;