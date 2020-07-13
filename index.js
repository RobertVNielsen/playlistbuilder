/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

/*
const SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'c666dc2a88094a638cbe13861f393429',
  clientSecret: '45f6bcf87ac044539d2a207b9fce2f91',
  
});

// Passing a callback - get Elvis' albums in range [20...29]
spotifyApi
  .getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 })
  .then(
    function(data) {
      console.log('Album information', data.body);
    },
    function(err) {
      console.error(err);
    }
  );

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
var request = require('request'); // "Request" library

var client_id = 'c666dc2a88094a638cbe13861f393429'; // Your client id
var client_secret = '45f6bcf87ac044539d2a207b9fce2f91'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.get(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/search?q=Arctic+Monkeys&type=artist',
      headers: {
        'Authorization': 'Bearer BQAHP7YhoU-cZ2BrQuVxPecTpzWMMqv3oPhbCuHl0pWvSzAyckTglaV0RD7q2l6pSLOovc31ur1rxUPk3tXcJthlWroKBFHYjdpogmjBEqrPCUxatFrJOyny95bQ0U4_5_6MP5kOTBGpXF83p5Q'
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(response);
    });
  }
});
*/

const app = express();
app.use(
  session({secret: 'secret', resave: false, saveUninitialized: false})
)
console.log('before')

console.log('after')

const corsOptions = {
  origin: "https://playlistbuilder.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://nielrobe:GhostMantis9@cluster0-iyhb0.mongodb.net/test?retryWrites=true&w=majority";
console.log(MONGODB_URL)

app.use(flash());

// Route setup. You can implement more in the future!
const dbRoutes = require('./routes/db');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const playlistRoutes = require('./routes/playlist');
const allPlaylistsRoutes = require('./routes/allplaylists');
const shareRoutes = require('./routes/share');

console.log('where?')

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use('/db', dbRoutes)
   .use('/login', loginRoutes) 
   .use('/signup', signupRoutes) 
   .use('/playlist', playlistRoutes) 
   .use('/allplaylists', allPlaylistsRoutes)
   .use('/share', shareRoutes) 
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     console.log('here?');
     
     res.render('index', {title: 'Welcome to my CSE341 repo', path: '/', });
    })
   //.use((req, res, next) => {
     // 404 page
     //res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   //})
   //.listen(PORT, () => console.log(`Listening on ${ PORT }`));

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // This should be your user handling code implement following the course videos
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Mmmmmmmmmmmmmmm')
    console.log(err);
  }); 

