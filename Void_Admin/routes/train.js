const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

//Importing model
const User = require('../models/Users');
const Otp = require('../models/Otp');


//Loading Training page for new employ
router.get('/',(req,res)=>{
    username='';
    otp='';
    res.render('train',{username});
});

router.post('/',jsonParser,(req,res)=>{
    const username=req.body.username;
    const otp = parseInt(req.body.otp);
    let errors = [];
    User.findOne({username:username})
        .then(user=>{
            console.log(user);
            if(user === null){
                errors.push({msg:'Please register the user'});
                res.render('train',{errors});
            } else{
                const newOtp = new Otp({
                    username,
                    otp
                });
                newOtp.save()
                    .then(user=>{
                        username='';
                        res.render('train',{username,otp});
                    }).catch(err=>console.log(err));
            }
        }).catch(err=>console.log(err));
});
//Loading Training page for new employ
router.put('/',jsonParser,(req,res)=>{
    const username=req.body.username;
    const otp='';
    let errors = [];
    User.findOne({username:username})
        .then(user=>{
            console.log(user);
            if(user === null){
                errors.push({msg:'Please register the user'});
                res.render('train',{errors});
            } else{
                res.render('train',{username,otp});
            }
        }).catch(err=>console.log(err));
});
module.exports = router;