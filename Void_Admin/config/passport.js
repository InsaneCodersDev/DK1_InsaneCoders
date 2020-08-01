const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model
const Admin = require('../models/Admins');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField : 'admin_id',passwordField: 'admin_password'}, (admin_id,admin_password,done)=>{
            // Match User
            Admin.findOne({admin_id: admin_id})
                .then(user =>{
                    if(!user){
                        return done(null, false, {message: 'That id is not registered'});
                    }
                    // Match password
                    console.log(user.admin_password);
                    console.log(admin_password);
                    bcrypt.compare(admin_password, user.admin_password).then((isMatch) => {
                        if(isMatch){
                            return done(null,user);
                        } else{
                            return done(null, false, {message: 'Password incorrect'});
                        }
                    })
                    .catch((err)=>console.log(err));

                })
                .catch(err => console.log(err));   
        })
    );
    passport.serializeUser((user, done) =>{
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        Admin.findById(id, (err, user)=> {
          done(err, user);
        });
      });

}