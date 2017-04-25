/**
 * Created by Hary on 24.4.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let userLogSchema = mongoose.Schema({
   dateStamp: {type:String, default:""},
    createAt:{type:[ObjectId], default:[]},
    deleteAt:{type:[ObjectId], default:[]},
    log:{type:[ObjectId], default:[]},
    asked:{type:Number, default:0 },
    answer:{type:[ObjectId], default:[]},
    sortParam:{type:Date,default:Date.now()}

});

const UserLog = mongoose.model('UserLog',userLogSchema);
module.exports = UserLog;
