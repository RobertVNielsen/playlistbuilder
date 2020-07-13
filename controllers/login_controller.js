const User = require('../models/user');
const crypt = require('bcryptjs');

exports.page = (req, res, next) => {
    res.render('login', { 
        title: 'Login', 
        path: '/login',
        isPlaylistPage: false
    });
}

exports.authenticate = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username})
        .then(user => {
            if (!user) {
                res.redirect('/login')
            }
            crypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        req.session.user = user;
                        req.session.loggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            console.log('1')
                            res.redirect('/allplaylists');
                        })
                    }
                    console.log('2')
                    //req.flash('failed', "Invalid email or password");
                    
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err); 
                });

            
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.logout = (req, res, next) => {
    if (req.session.loggedIn == true) {
        req.session.loggedIn = false;
        res.redirect('/');
    }
}