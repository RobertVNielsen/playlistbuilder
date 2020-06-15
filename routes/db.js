const express = require("express");
const router = express.Router();
const Song = require("../models/song");

router.get("/", (req, res, next) => {
    Song
        .find()
        .then(songs => {
            //console.log("Displayed Products");
            //console.log(products);
            res.render('db', { 
                songs: songs,
                title: 'Songs', 
                path: '/', // For pug, EJS 
                activeTA04: true, // For HBS
                contentCSS: true, // For HBS
            });
        })
        .catch(err => {
            console.log(err); 
        })
})

router.post("/add_song", (req, res, next) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const song = new Song({
        title: title,
        artist: artist
    });
    song
        .save()
        .then(result => {
            console.log("Added song");
            res.redirect('/db');
        })
        .catch(err => {
            console.log(err); 
        })
})


    

module.exports = router;