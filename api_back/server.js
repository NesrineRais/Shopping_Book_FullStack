const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');




const fileUpload = require('express-fileupload');//c a pour l upload les files
//avec extension npm install express-fileupload
// permet de traiter les fichier arrivant depuis un input de type file
app.use(fileUpload({
    createParentPath: true
}));

// permet de traiter les donner arriver depuis un  formulaire (format: JSON)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// dossier static dans le dossier "public"
//dossier pour inserer dedant les images
app.use(express.static(__dirname + '/public'));


//npm install cors
const cors = require('cors');
app.use(cors());

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');




//pour voir le token c est dans le route 
//etape 1 withAuth.js
//etape2 authroute
//etape3 appel route dans server.js dans le.then de la mysql
//on déclare le cod eet install la dépendence
//on dois appeler la route des la token
///api/v1/auth/checkToken
const authRoutes = require('./routes/authRoutes') ;
const orderRoutes = require('./routes/orderRoutes');


mysql.createConnection({
	host: "localhost",
	database: "nesrine_shopping",
	user: "root",
	password: "root",
	port: 8889 //on trouve le port dans le localhost php en haut server localhost
}).then((db) => {
    console.log('connecté bdd');
    setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);

    app.get('/', async(req, res, next)=>{
	    res.json({status: 200, msg: "api shopping nesrine ok"})
	})
   
	bookRoutes(app, db)
	userRoutes(app, db)
	authRoutes(app, db) //on dois appeler la route comme les autres routes
    orderRoutes(app,db)
    
})


const PORT = 9100;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})