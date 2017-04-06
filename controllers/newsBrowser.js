/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    loadNews: (req, res) => {

        Article.find({}).sort({date:-1}).limit(6).populate('author').then(articles=>{
           console.log(articles);


            res.render('news/newsBrowser',{
                articles
            });
        });


    }
};