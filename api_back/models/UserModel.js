const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

//cryptage Pass


class UserModel {
    
    static getAllUsers() {
        return db.query('SELECT * FROM users')
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static getOneUser(id) {
        return db.query('SELECT * FROM users WHERE id=?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static async saveOneUser(req){
        let hash = await bcrypt.hash(req.body.password, saltRounds)

            return db.query('INSERT INTO users (firstName, lastName, email, password, role, address, zip, city, phone, creationTimestamp, connexionTimestamp) VALUES (?, ?, ?, ?, "user", ?, ?, ?, ?, NOW(), NOW())', [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err
            })
        
       
    }
    
    //on dois rajouter la requete pour récupérer les utilisateurs
    static getUserByEmail(email) {
        return db.query('SELECT * FROM users WHERE email=?', [email])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }

    static updateOneUser(req, id){
        return db.query('UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ?, address= ?,  zip= ?, city = ?, phone = ?  WHERE id = ?', [req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.address, req.body.zip, req.body.city, req.body.phone, id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static deleteOneUser(id){
        return db.query('DELETE FROM users WHERE id = ?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    
}