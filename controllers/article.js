/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        res.render('newsCreation/create')
    },
    createPost: (req, res) => {
        let articleParts = req.body;

        let errorMsg = '';

        if (!req.isAuthenticated()) {

            errorMsg = 'U dont belong Here'
        } else if (!articleParts.title) {
            errorMsg = 'Write some title'
        } else if (!articleParts.content) {
            errorMsg = 'Write some text'
        }
        ;

        if (errorMsg) {
            res.render('newsCreation/create', {
                error: errorMsg
            });

            return;
        }
        let userId = req.user.id;
        articleParts.author = userId;


        Article.create(articleParts).then(article=>{

            req.user.articles.push(article.id);
            req.user.save(err=>{
                if(err){
                    res.render('newsCreation/create',{
                        error: err.message
                    });
                }else{
                    res.redirect('/');
                }
            });

        });


    }
};
