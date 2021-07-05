const withAuth = require('../withAuth')
//dans back on fais pas import de module on faire require par contre front c est import
// c est l authorisation pour l admin avec le token
//si ok on vas recevoir la reponse 200 de next dans withAuth
module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);
	//il faut passer la base donné en argument pour récupérer les users
    
   app.get('/api/v1/auth/checkToken', withAuth, async (req, res, next)=>{
	    // si tout roule on envoie status 200 au front
		//on veut on une requete on recois le token et les users
		
	     let user = await userModel.getOneUser(req.id);
		 //il a  rajouter la route de tous les users
	    if(user.code) {
	    	res.json({status:500, msg: "aucun user associé", err: user})
	    }
	    
	    
	    res.json({status: 200, msg: "token ok", user: user[0]})
	})
  
    
}