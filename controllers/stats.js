/**
 * Created by Hary on 25.4.2017 г..
 */

const UserLog = require('mongoose').model('UserLog');
const User = require('mongoose').model('User');
module.exports = {
    basicView: (req, res) => {

        res.render("stats/basic");
    },

    questionsAnswersView: (req, res) => {


        let myObj = [];

        UserLog.find({}).sort({date: -1}).limit(30).then(sortedData => {

            sortedData.map(data => {
                let newObj = {
                    date: data.dateStamp,
                    questions: data.asked,
                    answers: data.answer === undefined ? 0 : data.answer.length
                };

                myObj.push(newObj);

            });
            let output = JSON.stringify(myObj);

            res.render("stats/questionsAnswers",
                {output});


        })
    },
    userActivityView: (req, res) => {

        let myObj = [];
        UserLog.find({}).sort({date: -1}).limit(30).then(sortedData => {

            sortedData.map(data => {
                let newObj = {
                    date: data.dateStamp,
                    logs: data.log === undefined ? 0 : data.log.length
                };

                myObj.push(newObj);
            });

            let output = JSON.stringify((myObj));


            res.render("stats/userActivity", {output});

        })


    },
    newsActivityView: (req, res) => {

        let myObj = [];
        UserLog.find({}).sort({date: -1}).limit(30).then(sortedData => {

            sortedData.map(data => {
                let newObj = {
                    date: data.dateStamp,
                    create: data.createAt === undefined ? 0 : data.createAt.length,
                    delete: data.deleteAt === undefined ? 0 : data.deleteAt.length
                };

                myObj.push(newObj);
            });

            let output = JSON.stringify((myObj));


            res.render("stats/newsCreated", {output});

        })
    },

    logBrowserView: (req, res) => {

        UserLog.find({}).sort({sortParam: 1}).limit(32).then(log => {

            let displayObj = [];

            log.map(logForDisplay => {

                let myObj = {
                    dateStamp: logForDisplay.dateStamp,
                    createAt: logForDisplay.createAt.length,
                    deleteAt: logForDisplay.deleteAt.length,
                    log: logForDisplay.log.length,
                    answer: logForDisplay.answer.length,
                    asked: logForDisplay.asked,
                    id: logForDisplay._id
                };
                displayObj.push(myObj);
            });
            res.render("stats/logBrowser", {displayObj});
        });


    },
    byDate: (req, res) => {

        let myObj =[];
        let id = req.params.id;
        console.log(id);
        UserLog.findOne({_id:id}).then(currentDay=>{
            for(let i=0; i<currentDay.log.length;i++){
                User.findOne({_id:currentDay.log[i]}).then(user=>{
                    let tempObj={
                        id:user._id,
                        name:user.fullName
                    };
                    myObj.push(tempObj)
                })
            }
        });

        res.render('stats/oneDay',{myObj});
    }


};




