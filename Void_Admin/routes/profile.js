const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Importing model
const User = require('../models/Users');
const Granted = require('../models/Granted');
const { isEmptyObject } = require('jquery');
const e = require('express');
const Attendance = require('../models/Attendance');

router.get('/',(req,res)=>{
    log={};
    dates=[];
    time=[];
    res.render('profile',{log,dates,time});
});

router.put('/',jsonParser,(req,res)=>{
    const username= req.body.username;
    console.log(username);
    User.findOne({username:username})
        .then(user=>{
            if(!user){
                console.log('empty');
            }
            var leave = 30
            Granted.find({username:username,type:'Leave'})
                    .then(grant=>{
                        if(grant.length !== 0){
                            for(var i=0;i<grant.length;i++){
                                leave = leave - parseInt(grant[i].days);
                            }
                        }
                        var date = user.dob.toString();
                        const myDate = date.split(' ',4);
                        date = myDate[0]+ ' ' + myDate[1]+ ' ' + myDate[2]+ ' ' + myDate[3];
                        log= user;
                        log.date = date;
                        Attendance.find({username:username})
                            .then(atd=>{
                                var dates = [];
                                var time = [];
                                for(var i=0;i<atd.length;i++){
                                    var d = atd[i].date.toString() + "/" + atd[i].month.toString();
                                    dates.push(d);
                                    time.push(atd[i].time);
                                }
                                res.render('profile', {log,dates,time,leave}); 
                            }).catch(err=>console.log(err));
                    }).catch(err=>console.log(err));
        }).catch(err=> console.log(err));
});

module.exports = router;