/**
 * Created by Hary on 6.4.2017 г..
 */
const Article = require('mongoose').model('Article');
const User = require('mongoose').model('User');
const UserLog = require('mongoose').model('UserLog');
const DeletionArchive = require('mongoose').model('DeletionArchive');


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

        let myDate = new Date();
        let objMaterial = myDate.getDate() + "/" + (myDate.getMonth()+1) + "/" + myDate.getFullYear();
        UserLog.findOne({dateStamp: objMaterial}).then(createDate => {

            if (createDate) {

                createDate.createAt.push(req.user._id);
                createDate.save();

            }
            else {

                //Should throw Err

                let userLogObject = {

                    dateStamp: objMaterial,

                };

                UserLog.create((userLogObject)).then(newLogDate => {

                    newLogDate.createAt.push(req.user._id);
                    newLogDate.save();
                });
            }
        });

        let image = req.files.image;

        if (image) {
            let filename = image.name;


            image.mv(`./public/imagesFromNews/${filename}`, err => {
                if (err) {
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

            let myDate = new Date();
            let objMaterial = myDate.getDate() + "/" + (myDate.getMonth()+1) + "/" + myDate.getFullYear();
            UserLog.findOne({dateStamp: objMaterial}).then(createDate => {
                if (createDate) {
                    createDate.deleteAt.push(req.user._id);
                    createDate.save();

                }
                else {
                    //Should throw Err
                    let userLogObject = {
                        dateStamp: objMaterial,
                    };
                    UserLog.create((userLogObject)).then(newLogDate => {
                        newLogDate.deleteAt.push(req.user._id);
                        newLogDate.save();
                    });
                }
            });



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
        console.log(user);
        let adminAuthor = user.articles.indexOf(id) > -1 || user.admin;


        if (adminAuthor) {


            Article.findOne({_id: id}).then(article => {
                let authorId = article.author;

                User.findOne({_id: authorId}).then(authorUser => {

                    Article.remove({_id: id}).then(leftArticles => {


                        let deleter = {
                            title:article.title,
                            content:article.content,
                            author: authorId,
                            deleter: user._id,
                            dateOfCreation:article.date,
                            dateOfDeletion:Date.now()
                        };

                        DeletionArchive.create(deleter).then(x=>{
                            x.save;
                        });

                        console.log(deleter);



                        let index = authorUser.articles.indexOf(id);
                        authorUser.articles.splice(index, 1);
                        authorUser.save();
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
