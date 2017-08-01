const bcrypt=require('bcryptjs');
const User=require('../models/user.js');

const usersController={};

usersController.index=(req,res)=>{
    console.log('usersController');
    User.findUserPokemons(req.user.id)
    .then(pokemons=>{
        res.render('auth/userhome',{
            currentPage:'index',
            message:'ok',
            user:req.user,
            data:pokemons,
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({err:err});
    });
}

usersController.create=(req,res)=>{
    const salt=bcrypt.genSaltSync();
    const hash=bcrypt.hashSync(req.body.password,salt);
    User.create({
        username:req.body.username,
        email:req.body.email,
        password_digest:hash,
        nickname:req.body.nickname,
    }).then(user=>{
        req.login(user,(err)=>{
            if(err)return next(err);
            res.redirect('/userhome');
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
}

module.exports=usersController;