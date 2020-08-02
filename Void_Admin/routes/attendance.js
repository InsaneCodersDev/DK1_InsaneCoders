const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Importing model
const Attendance = require('../models/Attendance');
const User = require('../models/Users');

//Loading Exception page
router.get('/',(req,res)=>{
    Attendance.find({})
        .then(user=>{
            if(!user){
                console.log('empty');
            }
            //log ka array bana phir append kar sab ka
            log=[];
            var date = [];
            for(var i=0; i< user.length; i++){
                if(date.find(element => element==user[i].date)==undefined){
                    date.push(user[i].date);
                    // console.log(date);
                }
                if(log.find( ({ username }) => username === user[i].username ) === undefined){
                    log.push({username:'',date:[],atd:[]});
                    // console.log(log);
                    log[log.length - 1].username = user[i].username;
                    if(user[i].date !== date[0]){
                        for(var j=0;j<date.length-1;j++){
                            log[log.length - 1].date.push(date[j]);
                            log[log.length - 1].atd.push('Not applicable');
                        }
                    }
                    log[log.length - 1].date.push(user[i].date);
                    if(user[i].attendance){
                        log[log.length - 1].atd.push('present');
                    }else{
                        log[log.length - 1].atd.push('absent');
                    }
                } else{
                    // const o = log.find( ({ username }) => username === user[i].username ); 
                    log.find( ({ username }) => username === user[i].username ).date.push(user[i].date);
                    if(user[i].attendance){
                        log.find( ({ username }) => username === user[i].username ).atd.push('present');
                    }else{
                        log.find( ({ username }) => username === user[i].username ).atd.push('absent');
                    }
                    // console.log(o);
                }
            }
            for(var i=0; i< log.length;i++){
                if(log[i].date[log[i].date.length -1] !== date[date.length -1]){
                    log[i].date.push(date[date.length -1]);
                    log[i].atd.push('-');
                }
            }
            res.render('attendance',{log,date});
        })
        .catch(err=> console.log(err));
});

module.exports = router;