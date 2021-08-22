const express=require('express');
const expressLayouts=require('express-ejs-layouts');

const port=process.env.PORT||8000;

const app=express();

// EJS part

// basicallt it will fit the rendering part into the layout file
app.use(expressLayouts);
app.set('view engine','ejs');




// Handle Routes in index or exports of that


app.use('/',require('./routes/index'));


app.use('/users',require('./routes/users'));        





app.listen(port,()=>console.log(`Server Running on port ${port}`));
