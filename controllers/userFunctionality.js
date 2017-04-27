const Article = require('mongoose').model('Article');
const Question = require('mongoose').model('Question');
const User = require('mongoose').model('User');
const nodemailer = require('nodemailer');
const UserLog = require('mongoose').model('UserLog');
const DeletionArchive = require('mongoose').model('DeletionArchive');

function validateArticle(req) {

    let errorMsg = '';
    if (!req.isAuthenticated()) {
        errorMsg = 'U dont belong Here'
    }
    return errorMsg;
}

module.exports = {
    formGet: (req, res) => {


        if (!req.isAuthenticated()) {           //authorisation for current user and admins
            res.render('home/index')
        }
        else {

            let userId = req.params.id;

            Article.find({author: userId}).sort({date: -1}).limit(6).then(articles => {               //find by user ID


                if (articles.length < 1) {


                    Question.find({answeredBy: userId}).limit(6).then(answeredByMe => {              // find by user id


                        res.render('functionality/basicInfo', {
                                articles, unanswered: answeredByMe
                            }
                        );
                    });

                } else {

                    for (let index = 1; index < articles.length; index++) {

                        articles[index].content = articles[index].content.substring(0, 200) + "...";
                    }

                    let baseArticle = articles[0].content;

                    if (baseArticle.length > 1000) {
                        baseArticle = baseArticle.substring(0, 1000) + "..."
                    }
                    else {
                        baseArticle = baseArticle + " ".repeat(1000 - baseArticle.length);
                    }

                    DeletionArchive.find({deleter: userId}).sort({dateOfDeletion:-1}).limit(6).then(deletions => {


                        Question.find({answeredBy: userId}).limit(6).then(answeredByMe => {              // find by user id


                            res.render('functionality/basicInfo', {
                                articles, unanswered: answeredByMe, deletions
                            });
                        });


                    });


                }
                ;
            })
        }


// Iskam da imam i funkcionalnost da razgledam vsi4ki otgovoreni vuprosi
// Iskam da imam vuzmojnost da vidq vsi4ki novini publikuvani ot men

    },

    answerFormGet: (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/')
        }
        else {

            let questionId = req.params.id;
            Question.findOne({_id: questionId}).then(question => {


                res.render('functionality/answerForm', {
                    kur: question.content
                });
            });


        }
    },

    answerFormPost: (req, res) => {

        if (validateArticle(req)) {
            res.redirect('/');
        }
        else {


            let questionId = req.params.id;



            let msg = req.body['message'];


            let userParams = req.user;
            let userId = userParams.id;



            Question.update({_id: questionId}, {$set: {answered: true, answeredBy: userId, answer: msg}}).then(x => {


                Question.findOne({_id: questionId}).then(question => {


                    let mailRecepient = question.authorMail;
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


                    let myDate = new Date();
                    let objMaterial = myDate.getDate() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getFullYear();
                    UserLog.findOne({dateStamp: objMaterial}).then(answerDate => {

                        if (answerDate) {
                            answerDate.answer.push(req.user._id);
                            answerDate.save();

                        }
                        else {

                            //Should throw Err

                            let userLogObject = {

                                dateStamp: objMaterial,

                            };

                            UserLog.create((userLogObject)).then(newLogDate => {

                                newLogDate.answer.push(req.user._id);
                                newLogDate.save();
                            });
                        }
                    });
                    res.redirect('/');
                })


            });

        }
    },

    questionView: (req, res) => {


        if (validateArticle(req)) {
            res.redirect('/');
        } else {

            Question.find({}).sort({date: -1}).then(firstSort => {

                firstSort.sort(function (a, b) {

                    if (a.answered > b.answered) {
                        return 1;
                    } else {
                        return -1;
                    }

                });

                firstSort.map(a => {


                    User.findOne({_id: a.answeredBy}).then(user => {

                        a.patok = user.fullName;
                    })
                });

                res.render('functionality/questionView', {
                    questions: firstSort
                })

            })
        }
    }
};