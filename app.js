const express=require('express');


const port=process.env.PORT||8000;

const app=express();

// Handle Routes in index or exports of that


app.use('/',require('./routes/index'));


app.use('/users',require('./routes/users'));        





app.listen(port,()=>console.log(`Server Running on port ${port}`));
