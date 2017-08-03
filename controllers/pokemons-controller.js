const Pokemon=require('../models/pokemon');
const User=require('../models/user');
const pokemonsController={};

pokemonsController.index=(req,res)=>{
    User.findUserPokemons(req.user.id)
    .then(pokemon=>{
        res.render('pokemons/pokemon-index',{
            currentPage:'index',
            message:'ok',
            user:req.user,
            data:pokemon
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
};

pokemonsController.create=(req,res)=>{
    Pokemon.create({
        name:req.body.name,
        type:req.body.type,
        attack:req.body.attack,
        defense:req.body.defense
    },req.user.id)
    .then(pokemon=>{
        res.send(pokemon)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
};

pokemonsController.show=(req,res)=>{
    Pokemon.findById(req.params.id)
    .then(pokemon=>{
        res.render('pokemons/pokemon-single',{
            currentPage:'show',
            message:'ok',
            data:pokemon
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
};

module.exports=pokemonsController;