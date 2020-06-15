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

const app = express();
app.use(
  session({secret: 'secret', resave: false, saveUninitialized: false})
)
console.log('before')

console.log('after')

const corsOptions = {
  origin: "https://prove-assignments.herokuapp.com/",
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
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03'); 
const ta04Routes = require('./routes/ta04'); 
const prove02Data = require('./routes/prove02'); 
const bookInfoRoutes = require('./routes/bookInfo'); 
const adminRoutes = require('./routes/admin'); 
const loginRoutes = require('./routes/login');
const editRoutes = require('./routes/edit');
const shopRoutes = require("./routes/shop")
const createAccountRoutes = require('./routes/create_account');

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
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta04', ta04Routes)
   .use('/admin', adminRoutes)
   .use('/prove02', prove02Data.routes)
   .use('/bookInfo', bookInfoRoutes)
   .use('/login', loginRoutes)
   .use('/edit', editRoutes)
   .use('/shop', shopRoutes)
   .use('/create_account', createAccountRoutes)
   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     console.log('here?')
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   })
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

