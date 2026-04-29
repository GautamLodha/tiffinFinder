
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
    },
    phoneSecondary : {
        type : String
    },
    role : {
        type : String,
        enum : ['student','provider'],
        default : 'student'
    },
    address : {
        type : String,
    },
    location : {
        type : {
            type : String,
            enum : ['Point'],
        },
        coordinates : {
            type : [Number]
        }
    }

},{timestamps : true})

userSchema.index({location : '2dsphere'})

userSchema.pre('save',async function(){
    // console.log(next());
    
    if(!this.isModified('password'))return ;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

})

userSchema.methods.comparePassword = async function(password) {
    console.log(password);
    console.log(this.password);
    
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User',userSchema);

