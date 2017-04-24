/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');
const User = require('mongoose').model('User');

function authenticaation(req) {

    let errorMsg = '';
    if (!req.isAuthenticated()) {
        errorMsg = 'U dont belong Here'
    }
    return errorMsg;
}

function validateArticle(articleArgs, req) {

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

        let errorMsg = validateArticle(articleParts, req);
        if (errorMsg) {
            res.render('newsCreation/create', {
                error: errorMsg
            });

            return;
        }

        let image = req.files.image;

        if(image){
            let filename = image.name;


            image.mv(`./public/imagesFromNews/${filename}`, err=> {
                if(err) {
                    console.log(err.message);
                }
            });
            articleParts.imagesFromNewsPath = `/imagesFromNews/${image.name}`;
        }

        let userId = req.user.id;

        articleParts.author = userId;

        //articleParts.imagesFromNewsPath = `/imagesFromNews/${image.name}`;

        Article.create(articleParts).then(article => {

            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err) {
                    res.render('newsCreation/create', {
                        error: err.message
                    });
                } else {
                    res.redirect('/news/newsBrowser');
                }
            });

        });
    },

    detailsGet: (req, res) => {

        let id = req.params.id;


        Article.findById(id).then(article => {
            res.render('newsCreation/details', article)
        });

    },

    editGet: (req, res) => {

        if (authenticaation(req)) {

            res.redirect('/');
            return;
        }
        else {
            let id = req.params.id;

            Article.findById(id).then(article => {

                res.render('newsCreation/edit', article)

            })
        }
    },

    editPost: (req, res) => {


        let articleArgs = req.body;
        let errorMsg = validateArticle(articleArgs, req);
        if (errorMsg) {
            res.render('newsCreation/edit', {
                error: errorMsg
            });

            return;
        }

        let id = req.params.id;
        let user = req.user;
        let adminAuthor = user.articles.indexOf(id) > -1 || user.admin;


        if (!adminAuthor) {
            res.render('newsCreation/edit', {
                error: "You have no rights here!"
            });
            return;
        }

        // Here I can Push last edits to the article

        Article.update({_id: id}, {$set: {title: articleArgs.title, content: articleArgs.content}})
            .then(err => {

                //res.redirect(`/newsCreation/edit/${id}`);
                res.redirect('/news/newsBrowser');
            })
    },

    deleteGet: (req, res) => {

        if (authenticaation(req)) {
            res.redirect('/')
        }
        else {
            let id = req.params.id;


            Article.findById(id).then(article => {
                res.render('newsCreation/delete', article)
            });
        }
    },

    deletePost: (req, res) => {


        if (authenticaation(req)) {
            res.redirect('/news/newsBrowser');

            return;
        }

        let id = req.params.id;


        let user = req.user;
        let adminAuthor = user.articles.indexOf(id) > -1 || user.admin;


        if (adminAuthor) {


            Article.findOne({_id: id}).then(article => {
                let authorId = article.author;

                User.findOne({_id: authorId}).then(user => {

                    Article.remove({_id: id}).then(leftArticles => {

                        let index = user.articles.indexOf(id);
                        user.articles.splice(index, 1);
                        user.save();
                        res.redirect('/news/newsBrowser');

                    })

                })

            });
        }

        else {
            res.render('newsCreation/edit', {
                error: "You have no rights here!"
            });
            return;

        }


        //Article.remove({_id: id}).then(x => {
//
        //        let index = user.articles.indexOf(id);
        //        console.log(index);
        //        user.articles.splice(index, 1);
        //        user.save();
        //        console.log(id);
        //        res.redirect('/news/newsBrowser');
//
//
        //    }
        //)
    }

};
