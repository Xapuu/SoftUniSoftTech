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

            let currentUserId = req.params.id;                                                                                  //find currentUserId

            Article.find({author: currentUserId}).sort({date: -1}).populate('author').limit(6).then(articlesWritten => {               //find currentUser Articles and populate with author
                for (let i = 0; i < articlesWritten.length; i++) {
                    articlesWritten[i].content = articlesWritten[i].content.substring(1, 200);
                    articlesWritten[i].title = articlesWritten[i].title.substring(1, 30);
                    articlesWritten[i].currentUser = articlesWritten[i].author.fullName;
                }

                Question.find({
                    answered: true,
                    answeredBy: currentUserId
                }).sort({dateAsked: -1}).populate('answeredBy').limit(6).then(answeredQuestions => {  //find currentUser Replies of questions and populate with author
                    for (let i = 0; i < answeredQuestions.length; i++) {
                        answeredQuestions[i].content = answeredQuestions[i].content.substring(1, 200);
                        answeredQuestions[i].answer = answeredQuestions[i].answer.substring(1, 200);
                        answeredQuestions[i].currentUser = answeredQuestions[i].answeredBy.fullName;

                    }

                    DeletionArchive.find({author: currentUserId}).sort({dateOfDeletion: -1}).populate('author').populate('deleter').limit(6).then(deletedArticlesOfCurrentUser => { //All articles questions of the current user from his prespective
                        for (let i = 0; i < deletedArticlesOfCurrentUser.length; i++) {
                            deletedArticlesOfCurrentUser[i].content = deletedArticlesOfCurrentUser[i].content.substring(1, 200);
                            deletedArticlesOfCurrentUser[i].currrentUser = deletedArticlesOfCurrentUser[i].author.fullName;

                        }
                        DeletionArchive.find({deleter: currentUserId}).sort({dateOfDeletion: -1}).populate('deleter').populate('author').limit(6).then(deletedArticlesOfCurrentAdminUser => { //All deleted articles from admin prespective

                            for (let i = 0; i < deletedArticlesOfCurrentAdminUser.length; i++) {


                                deletedArticlesOfCurrentAdminUser[i].content = deletedArticlesOfCurrentAdminUser[i].content.substring(1, 200);
                                deletedArticlesOfCurrentAdminUser[i].currentUser = deletedArticlesOfCurrentAdminUser[i].deleter.fullName;

                            }

                            res.render('functionality/basicInfo', {
                                articlesWritten,
                                answeredQuestions,
                                deletedArticlesOfCurrentUser,
                                deletedArticlesOfCurrentAdminUser
                            });
                        })
                    })

                })

            })
        }

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