/**
 * Created by Hary on 21.4.2017 г..
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let deltionSchema = mongoose.Schema(
    {
        title:{type:String, requred:true},
        content:{type:String, required:true},
        author:{type: ObjectId, required:true, ref:'User'},
        deleter:{type: ObjectId, required:true, ref:'User'},
        dateOfCreation:{type:Date, required:true},
        dateOfDeletion:{type:Date, default:Date.now()}

    }
);

const DeletionArchive = mongoose.model('DeletionArchive', deltionSchema);

module.exports = DeletionArchive;


