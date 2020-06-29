const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth')

router.get("/", auth, (req, res, next) => {
    res.render('playlist', { 
        title: 'playlist', 
        path: '/playlist', 
    });
})

router.post("/playlist", auth, (req, res, next) => {
    
})

module.exports = router;