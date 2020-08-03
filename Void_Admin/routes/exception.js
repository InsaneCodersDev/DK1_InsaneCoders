const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Importing model
const Exception = require('../models/Exceptions');
const Granted = require('../models/Granted');

//Loading Exception page
router.get('/',(req,res)=>{
    Exception.find({})
        .then(user=>{
            if(!user){
                console.log('empty');
            }
            res.render('exception', {log:user});
        })
        .catch(err=> console.log(err));
});

//Put route
router.put('/',jsonParser,(req,res)=>{
    const username = req.body.username;
    const type = req.body.subject;
    const days = parseInt(req.body.days);

    function addDays(date, days) {
        const copy = new Date(Number(date))
        copy.setDate(date.getDate() + days)
        return copy
      }
      
    const date = new Date();
    const duration = addDays(date, days);
    const status = true;

    if(days !== 0){
    Exception.findOne({username:username})
        .then(user=>{

            const newGranted = new Granted({
                username,
                duration,
                type,
                days,
                status
            });

            newGranted.save()
                .then(user=>{
                        console.log('done');
                    }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));

    //Deleting after granting
    Exception.deleteOne({username:username})
        .then(user=>{
            // console.log(user);
            console.log('deleted after granting');
        }).catch(err=>console.log(err));
    }
    
    Exception.find({})
        .then(user=>{
            if(!user){
                console.log('empty');
            }
            res.render('exception', {log:user});
        })
        .catch(err=> console.log(err));
});

//Delete Route
router.delete('/',jsonParser,(req,res)=>{
    const username = req.body.username;
    const type = req.body.subject;
    const days = 0;

    const duration = Date.now();
    status = false;
    const newGranted = new Granted({
        username,
        duration,
        type,
        days,
        status
    });

    newGranted.save()
        .then(user=>{
                console.log('done');
            }).catch(err=>console.log(err));

        Exception.deleteOne({username:username})
            .then(user=>{
            // console.log(user);
                console.log('deleted after granting');
            }).catch(err=>console.log(err));

        
        Exception.find({})
        .then(user=>{
            if(!user){
                console.log('empty');
            }
            res.render('exception', {log:user});
        })
        .catch(err=> console.log(err));
});

module.exports = router;