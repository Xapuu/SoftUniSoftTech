/**
 * Created by Hary on 7.4.2017 г..
 */

const nodemailer = require('nodemailer');
const Question = require('mongoose').model('Question');

module.exports = {

    formGet: (req, res) => {

        res.render('contacts/contacts');
    },

    formPost: (req, res) => {
        let params = req.body;

        let id = params.name;
        let mail = params.email;
        let subject = params.subject;
        let message = params.message;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'softuniprojet@gmail.com',
                pass: 'softuniprojet1234'
            }
        });

// setup email data with unicode symbols
        let mailOptions = {
            from: mail, // sender address
            to: 'softuniprojet@gmail.com', // list of receivers
            subject: subject, // Subject line
            text: "nothing", // plain text body
            html: 'From ' + id + 'with mail ' + mail + ' :' + message // html body
        };

        let questionObj = {
          author:id,
            authorMail:mail,
            subject:subject,
            content:message
        };

        Question.create(questionObj);
        console.log(questionObj);





// send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });

        res.redirect('/');
    }
};