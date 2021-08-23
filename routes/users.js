const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const passport=require('passport');

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
       });
        errors=[];
     
    
   }
   else{
       User.findOne({email:email},(err,user)=>{

            if(user)
            {
                errors.push({msg:"Already Registered"});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                   });
                    errors=[];
                
            }
            else{
                // created a entry newuser in user
                const newUser=new User({
                    name,
                    email,
                    password


                });
                 // Just read the doucmentation and do the same thing
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password=hash;
                    // save returns a promise
                    newUser.save()
                    .then(user=>{
                        req.flash('success_msg','Registered Successfully');
                        res.redirect('/users/login');
                    })
                    .catch(err=>console.log(err));
                });
            });

                
            }
           


       });
   }
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are succesfully logged out');
    res.redirect('/users/login');
});
module.exports=router;