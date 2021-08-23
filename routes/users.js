const express=require('express');
const router=express.Router();

router.get('/login', (req, res) => res.render('login'));

// Register Page
// handling errors- see when there is nantyproblem along with other things send errors and show them on regster page using botostrap
// and do nont clear the fields always fill them with values
var errors=[];
router.get('/register', (req, res) => res.render('register',{
    errors
}));

router.post('/register',(req,res)=>{
   const {name,email,password,password2}=req.body;
   


   if(!name||!email||!password||!password2)
   {
       errors.push({msg:'Fill in all the Fields'});
   }

   if(password!=password2)
   {
       errors.push({msg:'Passwords should be equal'});
   }

   if(password.length<6)
   {
       errors.push({msg:'password must be atleast 6 characters long'});
   }

   if(errors.length>0)
   {
       res.render('register',{
        errors,
        name,
        email,
        password,
        password2
       }).then(()=>{
        errors=[];
       }).catch(err=>console.log(err));
    
   }
   else{
       res.send('Pass');
   }
});


module.exports=router;