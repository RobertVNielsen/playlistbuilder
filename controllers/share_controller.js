const User = require('../models/user');
const Playlist = require('../models/playlist');

exports.page = (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            res.render('share', { 
                title: 'share', 
                path: '/share',
                playlist: playlist
            });
            
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.share = (req, res, next) => {
    userToShare = req.body.username;
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            User
                .findOne({username: userToShare})
                .then(user => {
                    console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
                    console.log(playlist)
                    playlist.shareTo = user._id;
                    console.log(user.username)
                    console.log(playlist.shareTo)
                    return playlist.save();
                })
                .then(results => {
                    
                    res.redirect('/playlist/'+req.params.id)
                })
                .catch(err => {
                    console.log(err); 
                })
            
            
        })
        .catch(err => {
            console.log(err); 
        })
}