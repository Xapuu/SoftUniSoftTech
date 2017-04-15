/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    loadNews: (req, res) => {

        Article.find({}).sort({date:+-1}).limit(4).populate('author').then(articles=>{

            res.render('news/newsBrowser',{
                articles
            });
        });


    },

    loadMultyNews: (req,res) => {

        let pagesCount;

       Article.find({}).count().then(articles=>{

           pagesCount=Math.ceil(articles/4);
           console.log(pagesCount);
        });




    }

};