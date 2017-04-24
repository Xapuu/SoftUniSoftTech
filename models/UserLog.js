/**
 * Created by Hary on 21.4.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let userActivitySchema = mongoose.Schema(
    {

    }
)




let userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        passwordHash: {type: String, required: true},
        fullName: {type: String, required: true},
        articles: { type:[ObjectId], default:[]},
        admin: {type:Boolean, default:false},
        salt: {type: String, required: true}
    }
);