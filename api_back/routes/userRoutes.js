//pour lr tokrn il faut le code et le jwt et le bcrypt et le saltrount
const bcrypt = require('bcrypt');
const saltRounds = 10;

//aprés on dois prendre le token pour la partie front

const jwt = require('jsonwebtoken');
const secret = 'pitichat';//pour faire token on dois faire mot de pass
//code secret et installer la dépendance
module.exports = (app, db)=>{
    
    const userModel = require('../models/UserModel')(db);
    
    app.get('/api/v1/users/all', async (req, res, next)=>{
	    let users = await userModel.getAllUsers();
	    if(users.code){
	        res.json({status: 500, err: users})
	    }
	    
	    res.json({status: 200, users: users})
	})
	
	app.get('/api/v1/users/one/:id', async (req, res, next)=>{
	    
	    let id = req.params.id;
	    
	    let user = await userModel.getOneUser(id);
	    
	    if(user.code){
	        res.json({status: 500, err: user})
	    }
	    
	    res.json({status: 200, user: user[0]})
	})
	

	//pour ajouter des utilisateur dans le formulaire register
	app.post('/api/v1/users/save', async (req, res, next)=>{
	    let result = await userModel.saveOneUser(req);
	    
	    if(result.code){
	        res.json({status: 500, err: result})
	   }
	    
	    
	    
	    res.json({status: 200, result: result})
	});


	//pour ajouter des la route qui gére le formulaire de login et mail
	//on dois rajouter la requete dans model pour récupérer les users
	//  return db.query('SELECT * FROM users WHERE email=?', [email])


	app.post('/api/v1/users/login', async (req, res, next)=>{
		
		let user = await userModel.getUserByEmail(req.body.email);
		console.log(user);
		
		if(user.length ===0) {
			res.json({status: 404, msg: "email non enregistré dans la base de données"})
		} else {
			let same = await bcrypt.compare(req.body.password, user[0].password);
			
			
			if(same === true) {
				
				console.log('mot de passe ok');
				const payload = {email: req.body.email, id: user[0].id};
				const token = jwt.sign(payload, secret);
				
				res.json({status: 200, token: token, user_id: user[0].id})
				
				
			} else {
				res.json({status: 401, msg: "mauvais mot de passe"})
			}
			
			console.log(same);
		}
		
		// res.json({status: 200}) //on l enlléve car on la res.json de else
		
	})
	
	app.put('/api/v1/users/update/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let result = await userModel.updateOneUser(req, id);
	    let users = await userModel.getAllUsers();

	    
	    if(result.code){
	        res.json({status: 500, err: result})
	    }
	    
	    if(users.code){
	        res.json({status: 500, err: users})
	    }
	    
	    res.json({status: 200, result: result, users: users})
	});
	
	app.delete('/api/v1/users/delete/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let result = await userModel.deleteOneUser(id);
	    let users = await userModel.getAllUsers();
	    
	    if(result.code){
	        res.json({status: 500, err: result})
	    }
	    
	    if(users.code){
	        res.json({status: 500, err: users})
	    }
	    
	    res.json({status: 200, result: result, users: users})
	});
	

	
}