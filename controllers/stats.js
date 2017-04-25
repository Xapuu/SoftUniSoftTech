/**
 * Created by Hary on 25.4.2017 г..
 */

const UserLog = require('mongoose').model('UserLog');

module.exports = {
    basicView:(req,res)=>{

        res.render("stats/basic");
    },

    questionsAnswersView:(req,res) =>{


        let myObj=[];

        UserLog.find({}).sort({date:-1}).limit(30).then(sortedData => {

            sortedData.map(data=>{
            let newObj={
                date:data.dateStamp,
                questions:data.asked,
                answers:data.answer===undefined?0:data.answer.length
            };

             myObj.push(newObj);

            });
           let output =JSON.stringify(myObj);

            res.render("stats/questionsAnswers",
                {output});



        })}};




