const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const newsBrowser = require('./../controllers/newsBrowser');
const contactController = require('./../controllers/contacts');
const userFunctionalityController = require('./../controllers/userFunctionality');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/newsCreation/create', articleController.createGet);
    app.post('/newsCreation/create', articleController.createPost);

    app.get('/news/newsBrowser', newsBrowser.loadNews);
    app.get('/news/multyNewsBrowser', newsBrowser.loadMultyNews);

    app.get('/newsCreation/details/:id', articleController.detailsGet);

    app.get('/newsCreation/edit/:id', articleController.editGet);
    app.post('/newsCreation/edit/:id', articleController.editPost);

    app.get('/newsCreation/delete/:id', articleController.deleteGet);
    app.post('/newsCreation/delete/:id', articleController.deletePost);


    //some random text that does nothing at all

    app.get('/contacts/contacts', contactController.formGet);
    app.post('/contacts/contacts', contactController.formPost);

    app.get('/user/details', userFunctionalityController.formGet);

    app.get('/functionality/answer/:id', userFunctionalityController.answerFormGet);
    app.post('/functionality/answer/:id', userFunctionalityController.answerFormPost);

    app.get('/functionality/questions', userFunctionalityController.questionView);




};

