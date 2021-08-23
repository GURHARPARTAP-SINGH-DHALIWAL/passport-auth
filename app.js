const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose'); 
const db=require('./config/keys').MongoURI;

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




// Handle Routes in index or exports of that


app.use('/',require('./routes/index'));


app.use('/users',require('./routes/users'));        





app.listen(port,()=>console.log(`Server Running on port ${port}`));
