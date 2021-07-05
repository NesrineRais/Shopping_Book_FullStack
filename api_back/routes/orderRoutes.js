const withAuth = require('../withAuth')
const stripe = require('stripe')('sk_test_51J05KyEpi8YwUxDGe8d5BYIfZ3AEvD9vlKzHCLydnsc6w2OPDZ8kT2ukCRD0j2ykKKbyoMxmgwlty6vTbbyvF1qd00uo9iTZ5z');

module.exports = (app, db)=>{
    const orderModel = require('../models/OrderModel')(db);
    const bookModel = require('../models/BookModel')(db);

    app.post('/api/v1/order/save',withAuth, async (req, res, next)=>{
        console.log("req.bod",req.body);
       // console.log(JSON.parse(req.body.basket)) cest pour voir la requete en tableau d objet
         // je récupère le panier que j'aurais envoyé depuis axios en front
        // let basket = JSON.parse(req.body.basket) avec axios il le fait ts seul
        let basket = req.body.basket


        // on va recalculer un total depuis le début
        let totalAmount = 0;

         // on enregistre l'order principal
         //la commande principal
	    let orderResult = await orderModel.saveOrder(req.body.user_id, totalAmount);
	    
	    
	    if(orderResult.code){
	        res.json({status: 500, err: orderResult})
	    }
	    // si tout s'est bien passé la requête nous renvoi un objet dans orderResult, 
        //dont une clef qui s'appelle toujours insertId qui nous renvoie l'id d'enregistrement du dernier order
	    let order_id = orderResult.insertId;
        //on a recupérer le url de la commande
        // je boucle sur toutes les bières de mon tableau.
        await Promise.all(basket.map(async (book, index)=>{//il faut ajouter await promise car tous on asynchrone
			//il faut attendre le resultat pour commencer la boucle
            console.log("book",book);
             // je profite de la boucle pour calculer le totalAmount
             //on récupére l eprix du back
             let bookInfo = await bookModel.getOneBook(book.id)
	        
           
	        // let total = parseInt(book.quantitySelected) * parseFloat(book.price);
            let total = parseInt(book.quantitySelected) * parseFloat(bookInfo[0].price);
            //pour la securité on a prix le prix du back non du front



	        totalAmount += total;

             // j'enregistre chaque bière dans orderdetails
	        let orderDetailResult = await orderModel.saveOrderDetail(order_id, book.id, book.quantitySelected, total);
	        console.log('orderDetailResult',orderDetailResult);
            // je mets à jour le totalAmount de la commande
	        let update = await orderModel.updateTotalAmount(totalAmount, order_id);
	        console.log('update',update)
	    }))
	    
	    res.json({status: 200, orderResult: orderResult,order_id : order_id})//il faut envoyer l orderid
	})

    	// cette route permet de créer un token 
	app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
		console.log('BODY', req.body);
		let order = await orderModel.getOneOrder(req.body.order_id);
		console.log('ORDER', order);
		const paymentIntent = await stripe.paymentIntents.create({
	        amount: order[0].totalAmount* 100,
	        currency: 'eur',
	        // Verify your integration in this guide by including this parameter
	        metadata: {integration_check: 'accept_a_payment'},
	        receipt_email: req.body.email,
	      });
		
		console.log(paymentIntent);
		
		res.json({client_secret: paymentIntent['client_secret']})

	})
	
	app.put("/api/v1/order/validate", withAuth, async (req, res, next)=>{
		
		console.log("BODY",req.body);
		let result = await orderModel.updateStatus(req.body.order_id);
		console.log(result);
		if(result.code) {
			res.json({status: 500, err: result})
		}
		
		let booksOrdered = await orderModel.getBooksByOrder(req.body.order_id);
		
		console.log('booksOrdered', booksOrdered);
		
		
		booksOrdered.map(async (book, index)=>{
			let newQuantity = parseInt(book.quantity) - parseInt(book.quantitySelected)
			let result = await bookModel.changeBookQuantity(newQuantity, book.book_id);
			console.log(result)
		})
		
		
		
		
		res.json({status: 200, msg: "status validé"})
	})

}