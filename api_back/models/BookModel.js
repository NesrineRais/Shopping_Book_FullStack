module.exports = (_db)=>{
    db = _db;
    return BooKModel;
}
class BooKModel {

    static getAllBooks() {
        return db.query('SELECT * FROM livres')
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }

    static getOneBook(id) {
        return db.query('SELECT * FROM livres WHERE id = ?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static saveOneBook(req){
        return db.query('INSERT INTO `livres`(name, price, photo, quantity, creationTimestamp, description) VALUES (?, ?, ?, ?, NOW(), ?)', [req.body.name, req.body.price, req.body.photo, req.body.quantity, req.body.description])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }

    static updateOneBook(req,id){
        return db.query('UPDATE livres SET name = ?, price = ?, photo = ?, quantity = ?, description = ? WHERE id = ?', [req.body.name, req.body.price, req.body.photo,req.body.quantity,req.body.description,id])
        .then((response)=>{
            return response
        })
        .catch((err)=>{
            return err
        })
    
    }

    static deleteOneBook(id){
        return db.query('DELETE FROM livres WHERE id = ?', [id])
        .then((response)=>{
            return response
        })
        .catch((err)=>{
            return err
        })
    }

    static changeBookQuantity(newQuantity, id) {
        return db.query('UPDATE livres SET quantity = ? WHERE id = ?', [newQuantity, id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }

}