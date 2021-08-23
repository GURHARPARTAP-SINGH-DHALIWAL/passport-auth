const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose'); 
const db=require('./config/keys').MongoURI;
const session=require('express-session');
const flash=require('connect-flash');

const port=process.env.PORT||8000;

const app=express();


// connect to MongoDB
mongoose.connect(db,{useNewUrlParser:true})
        .then(()=>console.log("connected to MongoDB"))
        .catch(err=>console.log("Failed to connect :",err));

// EJS part

// basicallt it will fit the rendering part into the layout file
app.use(expressLayouts);
app.set('view engine','ejs');

// Body Parser to convert form data to JSON  
app.use(express.urlencoded({extended:false}));


// express session
app.use(session({
    secret: 'I Will not tell you this key',
    resave: false,
    saveUninitialized: true,
  
  }));

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next(); //goto next middleware oops there is none or there is lol
});




// Handle Routes in index or exports of that


app.use('/',require('./routes/index'));


app.use('/users',require('./routes/users'));        





app.listen(port,()=>console.log(`Server Running on port ${port}`));
