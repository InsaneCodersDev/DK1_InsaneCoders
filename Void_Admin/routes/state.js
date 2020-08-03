const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//model
const Admin = require('../models/Admins');
const User = require('../models/Users');
const Attendance = require('../models/Attendance');
const Exception = require('../models/Exceptions');
const Granted = require('../models/Granted');
const { data } = require('jquery');


router.get('/',(req,res,next)=>{
    User.countDocuments()
        .then(user=>{
            var data = [];
            data.push(user);
            data.push(15);
            data.push(14);
            data.push(20);
            data.push(10);
            data.push(9);
            location = "Maharashtra";
            la = ["Mumbai", "Pune", "Ahmednagar","Nashik","Dhule","Akola"];
            ta = [10,15,5,9,8,10];
            res.render('state_admin',{data,location,la,ta});
        }).catch(err=>console.log(err));
});

module.exports = router;
