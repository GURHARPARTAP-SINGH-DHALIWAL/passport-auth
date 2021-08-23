module.exports={
    ensureAuthenticated:function(req,res,next)
    {
        if(req.isAuthenticated())
        next();
        else
        {
            req.flash('error_msg','Please Log In to View this resource');
            return res.redirect('/users/login');
        }
    }
}