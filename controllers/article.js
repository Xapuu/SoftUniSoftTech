/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');

function validateArticle (articleArgs, req) {

    let errorMsg = '';
    if (!req.isAuthenticated()) {
        errorMsg = 'U dont belong Here'
    } else if (!articleArgs.title) {
        errorMsg = 'Write some title'
    } else if (!articleArgs.content) {
        errorMsg = 'Write some text'
    }

    return errorMsg;
}

module.exports = {
    createGet: (req, res) => {
        res.render('newsCreation/create')
    },
    createPost: (req, res) => {
        let articleParts = req.body;

        let errorMsg = validateArticle(articleParts,req);



        if (errorMsg) {
            res.render('newsCreation/create', {
                error: errorMsg
            });

            return;
        }
        let userId = req.user.id;
        articleParts.author = userId;


        Article.create(articleParts).then(article => {

            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err) {
                    res.render('newsCreation/create', {
                        error: err.message
                    });
                } else {
                    res.redirect('/');
                }
            });

        });
    },

            detailsGet:(req, res) => {

            let id = req.params.id;



                Article.findById(id).then(article => {
                res.render('newsCreation/details',article)
            });

        },

    editGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article =>{

            res.render('newsCreation/edit',article)

        })

    },

    editPost: (req,res) =>{

        let id= req.params.id;

        let articleArgs = req.body;


        let errorMsg = validateArticle(articleArgs,req);

        if (errorMsg) {
            res.render('newsCreation/edit', {
                error: errorMsg
            });

            return;
        }

        // Here I can Push last edits to the article

        Article.update({_id:id}, {$set: {title: articleArgs.title, content: articleArgs.content}})
        .then(err =>{

        //res.redirect(`/newsCreation/edit/${id}`);
            res.redirect('/news/newsBrowser');
        })
    }

};
