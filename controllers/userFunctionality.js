const Article = require('mongoose').model('Article');
const Question = require('mongoose').model('Question');

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
            let articles = Article.find({});

            console.log(articles.author);
            console.log(articles);

            res.render('functionality/basicInfo',
                articles
            );
        }
// Tuk iskam da imam dva masiva, ediniq s poslednite 4 articles drugiq s vsi4ki ne otgovoreni vuprosi
// Iskam da imam i funkcionalnost da razgledam vsi4ki otgovoreni vuprosi
// Iskam da imam vuzmojnost da vidq vsi4ki novini publikuvani ot men



        //if(!req.isAuthenticated()){
        //    res.render('home/index')
        //}
        //else {
        //    Article.find({}).sort({date: -1}).limit(4).populate('author').then(articles => {
        //        console.log(articles);
//
//
        //        res.render('functionality/basicInfo', {
        //            articles
        //        });
        //    });
//
        //}
    }
};