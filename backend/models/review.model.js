
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phonePrimary : {
        type : String,
        required : true
    },
    phoneSecondary : {
        type : String
    },
    role : {
        type : String,
        enum : ['user','provider'],
        default : 'user'
    },
    address : {
        type : String,
    },
    location : {
        type : {
            type : String,
            enum : ['point'],
        },
        coordinates : {
            type : [Number]
        }
    }

},{timestamps : true})