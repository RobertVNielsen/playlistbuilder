const Song = require('../models/song');
const Playlist = require('../models/playlist');
const playlist = require('../models/playlist');
//const playlist = require('../models/playlist');
//const playlist = require('../models/playlist');
//const mongoose = require('mongoose')
// const song = mongoose.model("song", schema)
/*
req.session.destroy(err => {
        if(err){
            console.log(err)
        }
    })
    */

exports.getDisplayPage = (req, res, next) => {
    /*
    for (pl in req.session.user.playlists) {
        if (pl == req.params.id)
        {
            res.render('playlist', { 
                playlist: req.session.user.playlists,
                path: '/playlist'
            });
        }
    }
    res.redirect("/allplaylists")

    */
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            
            Song.find({_id: {$in: playlist.songs}})
                .then(songs => {
                    res.render('playlist', { 
                        playlist: playlist,
                        songs: songs,
                        path: '/playlist',
                        isPlaylistPage: true
                    });
                })
                .catch(err => {
                    console.log(err); 
                })
        })
        .catch(err => {
            console.log(err); 
        })
    
}


exports.postAddSong = (req, res, next) => {
    const title = req.body.title;
    const artist = req.body.artist;

    console.log(title);
    const song = new Song({
        title: title,
        artist: artist
    });

    song
        .save()
        .then(result => {

            console.log("AAAAAA" + req.params.id);
            Playlist
                .findById(req.params.id)
                .then(playlist => {
                    console.log("Created Song");
                    console.log(playlist.songs)
                    playlist.songs.push(result._id);
                    return playlist.save();
                    console.log("Created Song");
                    
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

exports.postDeleteSong = (req, res, next) => {
    const song = req.body.deleteID;
    //console.log(title);
    Song
        .findOneAndRemove({'_id': song})
        .then(result => {
            console.log("Deleted Song");
            Playlist.findById(req.params.id)
                .then(playlist => {
                    const index = playlist.songs.indexOf(song);
                    console.log("INDEX: "+index)
                    if (index > -1) {
                        playlist.songs.splice(index, 1);
                    }
                    return playlist.save()
                })
                .catch(err => {
                    console.log(err); 
                })
            res.redirect('/playlist/'+req.params.id)
        })
        .catch(err => {
            console.log(err); 
        })
}

/*

exports.postEditSong = (req, res, next) => {
    const oldTitle = req.body.oldtitle;
    const updatedTitle = req.body.utitle;
    const updatedPrice = req.body.uprice;
    const updatedDescription = req.body.udescription;
    Song
        .findOne({'title': oldTitle})
        .then(song => {
            song.title = updatedTitle;
            song.price = updatedPrice;
            song.description = updatedDescription;
            return song.save();
        })
        .then(result => {
            console.log("Updated Song");
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.getDeleteSong = (req, res, next) => {
    console.log("Displa");
    Song
        .find()
        .then(songs => {
            console.log("Displayed Songs");
            console.log(songs);
            res.render('pages/delete_product', { 
                songs: songs,
                title: 'Delete Product', 
                path: '/delete_product', // For pug, EJS 
                activeTA04: true, // For HBS
                contentCSS: true, // For HBS
            });
        })
        .catch(err => {
            console.log(err); 
        })
}

exports.postDeleteSong = (req, res, next) => {
    const title = req.body.deletetitle;
    //console.log(title);
    Song
        .findOneAndRemove({'title': title})
        .then(result => {
            console.log("Deleted Song");
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err); 
        })
}
*/