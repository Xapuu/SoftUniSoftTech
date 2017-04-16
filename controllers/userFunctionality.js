const Article = require('mongoose').model('Article');
const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const nodemailer = require('nodemailer');

function validateArticle (articleArgs, req) {

    let errorMsg = '';
    if (!req.isAuthenticated()) {
        errorMsg = 'U dont belong Here'
    }
    return errorMsg;
}

module.exports = {
    formGet: (req, res) => {



        if(!req.isAuthenticated()){
            res.render('home/index')
        }
        else {
            Article.find({}).sort({date:-1}).limit(4).then(articles => {

                for (let index = 1; index<4;index++){

                    articles[index].content= articles[index].content.substring(0,200)+"...";
                }

                articles[0].content= articles[0].content.substring(0,1000)+"...";



                Question.find({answered:false}).then(unanswered =>{


                    res.render('functionality/basicInfo',{
                        articles, unanswered}

                    );
                });



            });

        }
// Iskam da imam i funkcionalnost da razgledam vsi4ki otgovoreni vuprosi
// Iskam da imam vuzmojnost da vidq vsi4ki novini publikuvani ot men

    },

    answerFormGet:(req, res) => {
        if(!req.isAuthenticated()){
            res.render('home/index')
        }
        else {

            let questionId = req.params.id;
            console.log(questionId);
            Question.findOne({_id:questionId}).then(question=>{



                res.render('functionality/answerForm',{
                    kur: question.content
                });
            });


        }
    },

    answerFormPost:(req,res) =>{
        let questionId = req.params.id;
        let msg = req.body.message;

        let userParams = req.user;
        let userId = userParams.id;

       Question.update({_id:questionId},{$set:{answered:true}}).then(x=>{


           Question.findOne({_id:questionId}).then(question =>{


               let mailRecepient = question.authorMail ;
               let subject = question.subject;
               let replyMessage = msg;

               let transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                       user: 'softuniprojet@gmail.com',
                       pass: 'softuniprojet1234'
                   }
               });

               let mailOptions = {
                   from: '', // sender address
                   to: mailRecepient, // list of receivers
                   subject: subject, // Subject line
                   text: "nothing", // plain text body
                   html: replyMessage// html body
               };


              //  send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
               res.redirect('/user/details');
           })




       });




    }
};