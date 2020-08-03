const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    "admin_id":{
        type:String,
        required:true
    },
    "admin_password":{
        type:String,
        required:true
    },
    "position":{
        type:String,
        required:true
    }
});

const Admin = mongoose.model('Admin_logins',adminSchema);
module.exports = Admin;