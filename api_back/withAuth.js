//pour lE tokrn il faut le code et le jwt  ces t la dependance de token
const jwt = require('jsonwebtoken');
const secret = 'pitichat';


//withAuth serve a vérifier si le tken est valide ou non
//il va nous faire un middleware entre le req et next middleware c est res
const withAuth = (req, res, next)=>{
    
    const token = req.headers['x-access-token'];

    //il y a eq.body qui retourne dans le body le resultat est la on est besoin de la 
    //reponse dans le header si valide ou pas on peut voir le resultat dans le body
    
    if(token === undefined) {
        res.json({status: 404, msg:"Pas de token"})
    } else {
        
        jwt.verify(token, secret, (err, decode)=>{
            //c est une fonction existance avec jwt le veriify
            console.log("decode",decode)
            if(err){
                 // mauvais token !
                res.json({status: 401, msg: "attention Token non valide"})
            } else {

                // bon token on passe à la suite
                
                // le token est bon, je peux récupérer l'id de l'utilisateur dans le token
                // on avait enregister celui-ci lors du login
                // je le stock dans le req de la fonction suivante
                req.id = decode.id;
                next() //si le token est valide le fonction next va envoyer status 200 ok 
            }
        })
        
        
    }
    
    
}

//il faut exporter par 
module.exports = withAuth;