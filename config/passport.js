const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const User=require('../models/user');

// This will receive passport from app.js and moidify it ot use current strategy
module.exports=function(passport){

    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        User.findOne({email:email},(err,user)=>{
            if(err)return done(err);
            if(!user)
            {
               return done(null,false,{message:`${email} not registered`});
            }
            // password in user is encrypted 
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)throw err;
                if(isMatch)
                {
                  return  done(null,user,{message:"Authenticated"});
                }
                else
                {
                   return  done(null,false,{message:"Incorrect Password"});
                }
            }
            );
        });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });

      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
};