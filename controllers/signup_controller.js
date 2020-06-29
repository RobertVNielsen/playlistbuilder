const User = require('../models/user');
const crypt = require('bcryptjs');

exports.page = (req, res, next) => {
    res.render('signup', { 
        title: 'signup', 
        path: '/signup', 
    });
}

exports.create = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
        .then(userdoc => {
            console.log(userdoc)
            if (userdoc) {
                return res.redirect('/signup');
            }
            return crypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username: username,
                        email: email,
                        password: hashedPassword
                    })
                    return user.save();
                })
                .then(result => {
                    res.redirect('../');
                })
                
        })
        .catch(err => {
            console.log(err);
        });   
}