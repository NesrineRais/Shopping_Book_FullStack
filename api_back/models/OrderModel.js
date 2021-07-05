module.exports = (_db)=>{
    db = _db;
    return orderModel;
}

class orderModel{
    static saveOrder(user_id, totalAmount) {
        return db.query('INSERT INTO orders (user_id, totalAmount, creationTimestamp, status) VALUES (?, ?, NOW(), "not payed")', [user_id, totalAmount])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static saveOrderDetail(order_id, book_id, quantity, total) {
        return db.query('INSERT INTO orders_details (order_id, book_id, quantity, total) VALUES (?, ?, ?, ?)', [order_id, book_id, quantity, total])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static updateTotalAmount(totalAmount, order_id) {
        return db.query('UPDATE orders SET totalAmount = ? WHERE id = ?', [totalAmount, order_id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }

    static updateStatus(id) {
        return db.query('UPDATE orders SET status = "payed" WHERE id = ?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    
    static getOneOrder(id) {
        return db.query('SELECT * FROM orders WHERE id = ?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err
                })
    }
    
    static getBooksByOrder(order_id) {
        return db.query('SELECT order_id, book_id, orders_details.quantity AS quantitySelected, livres.quantity AS quantity FROM orders_details INNER JOIN livres ON orders_details.book_id = livres.id WHERE order_id = ?', [order_id])
                .then((response)=>{
                    return response
                })
               
                .catch((err)=>{
                    return err
                })
    }
    

}