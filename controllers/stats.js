/**
 * Created by Hary on 25.4.2017 г..
 */

const UserLog = require('mongoose').model('UserLog');

module.exports = {
    basicView:(req,res)=>{

        res.render("stats/basic");
    },

    questionsAnswersView:(req,res) =>{


        UserLog.find({}).sort({date:-1}).limit(30).then(sortedData => {

            sortedData.map(x => {

                if (x.answered) {
                    x.answeredCount = x.answered.length();
                    sortedData.totalAnswered += x.answered.length();
                } else {
                    x.answeredCount = 0;
                    sortedData.totalAnswered+=0;
                }
            });

                console.log(sortedData);
            res.render("stats/questionsAnswers",
                {sortedData});



        })}}




