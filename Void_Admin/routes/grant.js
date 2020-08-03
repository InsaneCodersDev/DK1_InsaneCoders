const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//Importing model
const Granted = require('../models/Granted');

router.get('/',(req,res)=>{
    Granted.find({})
        .then(user=>{
            log=[];
            for(var i=0;i<user.length;i++){
                var date = user[i].duration.toString();
                const myDate = date.split(' ',4);
                if(user[i].status){
                log.push({username:user[i].username,duration:myDate,type:user[i].type,days:user[i].days,status:'Granted'});
                } else{
                    log.push({username:user[i].username,duration:myDate,type:user[i].type,days:user[i].days,status:'Rejected'});
                }
            }
            res.render('grant',{log});
        }).catch(err=>console.log(err));
});

module.exports = router;