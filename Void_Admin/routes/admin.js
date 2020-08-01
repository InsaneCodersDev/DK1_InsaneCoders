const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {ensureAuthenticated} = require('../config/auth')

//model
const Admin = require('../models/Admins');
const User = require('../models/Users');
const Attendance = require('../models/Attendance');
const Exception = require('../models/Exceptions');
const Granted = require('../models/Granted');

router.get('/',(req,res)=>{
    res.render('login');
});

//login handling post request
router.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/',
        session:true,
        failureFlash:true
    })(req,res,next);
    res.locals.user = req.body.admin
    
});

//Dashboard
router.get('/dashboard',(req,res)=> {
    User.find({})
        .then(user=>{
            const counts = [0,0,0,0];
            for(var i=0;i<user.length;i++){
                if(user[i].department === 'Technical'){
                    counts[0]++;
                }else if(user[i].department === 'HR'){
                    counts[1]++;
                }else if(user[i].department === 'Marketing'){
                    counts[2]++;
                }else{
                    counts[3]++;
                }
            }
            console.log(counts);
            const count_employ =counts.reduce(function(a, b){
                return a + b;
            }, 0);
            date = new Date();
            d = date.getDate();
            Attendance.countDocuments({date:d,attendance:true})
                .then(atd=>{
                    const count_present = atd;
                    const present_percentage = (count_present*100)/count_employ;
                    // console.log(present_percentage);
                    Exception.countDocuments()
                        .then(exp=>{
                            const count_request = exp;
                            Granted.countDocuments()
                                .then(grant=>{
                                    const count_grant = grant;
                                    Attendance.find({})
                                            .then(atd=>{
                                                var dates = [];
                                                var date = [];
                                                var count = [];
                                                for(var i=0;i<atd.length;i++){
                                                    if(date.find(element => element==atd[i].date)==undefined){
                                                        const d = atd[i].date.toString() + "/" + atd[i].month.toString();
                                                        date.push(atd[i].date);
                                                        dates.push(d);
                                                        if(atd[i].attendance == true){
                                                        count.push(1);
                                                        }else{count.push(0);}
                                                    }else{
                                                        if(atd[i].attendance == true){
                                                        count[count.length - 1] = count[count.length - 1] + 1;
                                                        } 
                                                    }
                                                }
                                                res.render('dashboard', {
                                                    count_employ,
                                                    count_present,
                                                    present_percentage,
                                                    count_request,
                                                    count_grant,
                                                    counts,
                                                    dates,
                                                    count
                                                });
                                            }).catch(err=>console.log(err));
                                })
                        }).catch(err=>console.log(err));
                }).catch(err=>console.log(err));            
        }).catch(err=>console.log(err));
});

router.post('/dashboard',(req,res)=> {
    User.find({})
    .then(user=>{
        const counts = [0,0,0,0];
        for(var i=0;i<user.length;i++){
            if(user[i].department === 'Technical'){
                counts[0]++;
            }else if(user[i].department === 'HR'){
                counts[1]++;
            }else if(user[i].department === 'Marketing'){
                counts[2]++;
            }else{
                counts[3]++;
            }
        }
        console.log(counts);
        const count_employ =counts.reduce(function(a, b){
            return a + b;
        }, 0);

        Attendance.countDocuments({date:27})
            .then(atd=>{
                const count_present = atd;
                const present_percentage = (count_present*100)/count_employ;
                Exception.countDocuments()
                    .then(exp=>{
                        const count_request = exp;
                        Granted.countDocuments()
                            .then(grant=>{
                                const count_grant = grant;
                                Attendance.find({})
                                        .then(atd=>{
                                            var dates = [];
                                            var date = [];
                                            var count = [];
                                            for(var i=0;i<atd.length;i++){
                                                if(date.find(element => element==atd[i].date)==undefined){
                                                    const d = atd[i].date.toString() + "/" + atd[i].month.toString();
                                                    date.push(atd[i].date);
                                                    dates.push(d);
                                                    if(atd[i].attendance == true){
                                                    count.push(1);
                                                    }else{count.push(0);}
                                                }else{
                                                    if(atd[i].attendance == true){
                                                    count[count.length - 1] = count[count.length - 1] + 1;
                                                    } 
                                                }
                                            }
                                            res.render('dashboard', {
                                                count_employ,
                                                count_present,
                                                present_percentage,
                                                count_request,
                                                count_grant,
                                                counts,
                                                dates,
                                                count
                                            });
                                        }).catch(err=>console.log(err));
                            })
                    }).catch(err=>console.log(err));
            }).catch(err=>console.log(err));            
    }).catch(err=>console.log(err));
});

//Loading Exception page
router.get('/dashboard/exception',(req,res)=>{
    res.render('exception');
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('/');
});

module.exports = router;