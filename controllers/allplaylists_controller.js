const Song = require('../models/song');
const Playlist = require('../models/playlist');

exports.displayPage = (req, res, next) => {
    Playlist
        .find({$or:[{creator: req.session.user._id}, {shareTo: req.session.user._id}]})
        .then(playlists => {
            res.render('allplaylists', { 
                title: 'allplaylists', 
                path: '/allplaylists', 
                playlists: playlists,
                isPlaylistPage: false
            });
        })
        .catch(err => {
            console.log(err); 
        });    
}

exports.postAddPlaylist = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    
    const playlist = new Playlist({
        title: title,
        description: description,
        songs: Array[null],
        creator: req.session.user._id,
        shareTo: null
    });

    playlist
        .save()
        .then(result => {
            res.redirect('/allplaylists')
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.postDeletePlaylist = (req, res, next) => {
    const playlist = req.body.deleteID;
    //console.log(title);
    Playlist
        .findOneAndRemove({'_id': playlist})
        .then(result => {
            console.log("Deleted Playlist");
            res.redirect('/allplaylists')
        })
        .catch(err => {
            console.log(err); 
        })
}