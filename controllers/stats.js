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



        })},
    userActivityView:(req,res)=>{

        let myObj=[];
         UserLog.find({}).sort({date:-1}).limit(30).then(sortedData =>{

             sortedData.map(data=>{
                 let newObj={
                     date:data.dateStamp,
                     logs:data.log===undefined?0:data.log.length
                 };

                 myObj.push(newObj);
             });

             let output = JSON.stringify((myObj));


             res.render("stats/userActivity",{output});

         })


    },
    newsActivityView:(req,res)=>{

        let myObj=[];
        UserLog.find({}).sort({date:-1}).limit(30).then(sortedData =>{

            sortedData.map(data=>{
                let newObj={
                    date:data.dateStamp,
                    create:data.createAt===undefined?0:data.createAt.length,
                    delete:data.deleteAt===undefined?0:data.deleteAt.length
                };

                myObj.push(newObj);
            });

            let output = JSON.stringify((myObj));


            res.render("stats/newsCreated",{output});

        })
    }


};




