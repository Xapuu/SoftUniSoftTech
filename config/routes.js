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

const cardsMailingController = require('./../controllers/cardsMailing');
const transPrintController = require('./../controllers/transPrint');
const booksPrintingController = require('./../controllers/booksPrinting');
const digitalMarcetingController= require('./../controllers/digitalMarceting');
const elArhivesController = require('./../controllers/elArhives');
const scaningController = require('./../controllers/scaning');
const formulqrsController = require('./../controllers/formulqrs');
const physicalStorageController = require('./../controllers/physicalStorage');
const elCommunicationsController = require('./../controllers/elCommunications');
const e_invoiceController = require('./../controllers/e-invoice');
const smsController = require('./../controllers/sms');
const emailController = require('./../controllers/email');
const elBooksController = require('./../controllers/elBooks');
const solutionController = require('./../controllers/solution')

const solutionController = require('./../controllers/solution');

var recaptcha = require('express-recaptcha');

recaptcha.init('6Ld-rB0UAAAAANyXZKFiGbBc1J7NM_NQg4Y93xeF', '6Ld-rB0UAAAAANoVTHTNIkiX9p1H7HhqBlhQvWnE');


module.exports = (app) => {

    app.get('/', homeController.index);


    app.get('/solution/solution',solutionController.solution);

    app.get('/services/elBooks',elBooksController.elBooks);

    app.get('/services/email',emailController.email);

    app.get('/services/sms',smsController.sms);

    app.get('/services/e-invoice',e_invoiceController.einvoice);

    app.get('/services/elCommunications',elCommunicationsController.elCommunications);

    app.get('/services/physicalStorage',physicalStorageController.physicalStorage);

    app.get('/services/scaning',scaningController.scaning);

    app.get('/services/formulqrs',formulqrsController.formulqrs);
    app.get('/services/elArhives',elArhivesController.elArhives);

    app.get('/services/digitalMarceting',digitalMarcetingController.digitalMarceting);

    app.get('/services/booksPrinting',booksPrintingController.booksPrinting);

    app.get('/services/transPrint',transPrintController.transPrint);

    app.get('/services/cardsMailing',cardsMailingController.cardsMailing);

    // GitHEAD
    app.get('/user/register', recaptcha.middleware.render, userController.registerGet);
    app.post('/user/register', recaptcha.middleware.verify, userController.registerPost);


    app.get('/services/lettersProduction',lettersProductionController.lettersProduction);

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

