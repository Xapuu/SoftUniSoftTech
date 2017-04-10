/**
 * Created by Hary on 9.4.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let questionSchema = mongoose.Schema({
    author: {type:String, required:true},
    authorMail:{type:String, required:true},
    subject:{type:String, required:true},
    content:{type:String, required:true},
    answeredBy:{type:String, default:""},
    answer:{type:String, default:""},
    dateAsked:{type:Date, default:Date.now()},
    answered: {type:Boolean, default:false}

});

const Question = mongoose.model('Question',questionSchema);

module.exports= Question;
