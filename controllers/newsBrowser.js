/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    loadNews: (req, res) => {


        Article.find({}).sort({date:-1}).limit(4).populate('author').then(articles => {

            mainArticle = articles[0];


            for (let index = 1; index<4;index++){
                articles[index].content= articles[index].content.substring(0,200)+"...";
            }

                articles.shift();
                res.render('news/newsBrowser',{
                    articles, mainArticle}

                );





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


