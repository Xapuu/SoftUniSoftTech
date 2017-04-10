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

    app.get('/newsCreation/details/:id', articleController.detailsGet);

    app.get('/newsCreation/edit/:id', articleController.editGet);
    app.post('/newsCreation/edit/:id', articleController.editPost);

    app.get('/contacts/contacts', contactController.formGet);
    app.post('/contacts/contacts', contactController.formPost);

    app.get('/user/details', userFunctionalityController.formGet);



};

