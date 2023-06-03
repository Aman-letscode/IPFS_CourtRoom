const mongoose = require('mongoose')


const msgSchema = new mongoose.Schema({

    msg_id: {
        type:String,
        required:[true,"can't be blank"],
        trim: true
    },

    content: {

        type:String,
        required: false,
        default: null,
        trim: true
    },

    user_id: {
        type:String,
        required: true,
        default: null,
        trim: true
    },
    case_id:{
        type:String,
        required: true,
        default: "A",
    },
    time:{
        type: String,
        required:true,
        default: "01/01/2024, 00:00:00 AM"
    },
    role:{
        type: String,
        required: false,
        enum: ['lawyer','judge'],
        default: 'lawyer',
        // required:true
    }
},
{timestamps:true})

const msgModel =  mongoose.model('message',msgSchema);

module.exports = msgModel;