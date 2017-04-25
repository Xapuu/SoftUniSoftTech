const User = require('mongoose').model('User');
const encryption = require('./../utilities/encryption');
const UserLog = require('mongoose').model('UserLog');

function loginWatcher(req) {
    let myDate= new Date();
    let objMaterial = myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear();
    UserLog.findOne({dateStamp:objMaterial}).then(logDate =>{

        if(logDate){
            if(logDate.log.indexOf(req.user._id)<0){
            logDate.log.push(req.user._id);
            logDate.save();

            }
        }
        else {

            let userLogObject = {

                dateStamp:objMaterial,

            };

            UserLog.create((userLogObject)).then(newLogDate =>{

                newLogDate.log.push(req.user._id);
                newLogDate.save();
            });
        }
})
}

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register', {captcha: req.recaptcha});
    },

    registerPost:(req, res) => {
        let registerArgs = req.body;
        if (req.recaptcha.error) {
            res.render("user/register", registerArgs);
            return;
        }

        User.findOne({email: registerArgs.email}).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {

                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    salt: salt
                };



                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }


                        loginWatcher(req);

                        res.redirect('/')
                    })
                })
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {
        let loginArgs = req.body;
        User.findOne({email: loginArgs.email}).then(user => {
            if (!user ||!user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/user/login', {error: err.message});
                    return;
                }

                loginWatcher(req);
                res.redirect('/');
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    }
};
