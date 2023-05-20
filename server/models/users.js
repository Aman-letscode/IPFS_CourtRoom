const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:[true,"can't be blank"],
        trim: true
    },
    lastname: {
        type:String,
        required: false,
        default: null,
        trim: true
    },
    user_id: {
        type:String,
        required: false,
        default: null,
        trim: true
    },
    password: {
        type:String,
        required: true,
        trim: true
    },
    role:{
        type: String,
        enum: ['lawyer','judge'],
        default: 'lawyer',
        // required:true
    }

})

const userModel =  mongoose.model('user',UserSchema);

module.exports = userModel;