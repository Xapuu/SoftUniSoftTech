const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');
const articleController = require('./../controllers/article');
const newsBrowser = require('./../controllers/newsBrowser');
const contactController = require('./../controllers/contacts');
const userFunctionalityController = require('./../controllers/userFunctionality');
const archiveController = require('./../controllers/archives');
const servicesController = require('./../controllers/services');
const mailingController = require('./../controllers/meiling');
const lettersProductionController = require('./../controllers/lettersProduction');
const digitalPrintController = require('./../controllers/digitalPrint');



module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/services/lettersProduction',lettersProductionController.lettersProduction)

    app.get('/services/services', servicesController.services);

    app.get('/services/digitalPrint',digitalPrintController.digitalPrint);

    app.get('/services/meiling', mailingController.meiling);

    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/newsCreation/create', articleController.createGet);
    app.post('/newsCreation/create', articleController.createPost);

    app.get('/news/newsBrowser', newsBrowser.loadNews);

    app.get('/news/multyNewsBrowser/:page', newsBrowser.loadMultyNews);
    app.post('/news/multyNewsBrowser', newsBrowser.wantedPage);

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

