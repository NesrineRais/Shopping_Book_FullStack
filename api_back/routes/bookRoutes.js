const withAuth = require('../withAuth')

module.exports = (app, db)=>{
    const bookModel = require('../models/BookModel')(db);
    
    //requete requpération tous les éléments
    app.get('/api/v1/books/all', async (req, res, next)=>{
	    let books = await bookModel.getAllBooks();
	    if(books.code){
	        res.json({status: 500, err: books})
	    }
	    
	    res.json({status: 200, books: books})
	})
	
    //requete requpération un élémnt
	app.get('/api/v1/books/one/:id', async (req, res, next)=>{
	    
	    let id = req.params.id;
	    
	    let books = await bookModel.getOneBook(id);
	    
	    if(books.code){
	        res.json({status: 500, err: books})
	    }
	    
	    res.json({status: 200, books: books})
	})
	
    //requete insertion dans la base un livre
	app.post('/api/v1/books/save', withAuth, async (req, res, next)=>{
	    let result = await bookModel.saveOneBook(req);
	    let books = await bookModel.getAllBooks(); //cette requete permet de nous gagner le temps de solicitation de server
        //permet de enregistrer un livre et de l affichage de la collection des livres avec le livre enregistrer
	    //pour l optimisation des requettes

	    if(result.code){
	        res.json({status: 500, err: result})
	    }

        if(books.code){
	        res.json({status: 500, err: books})
	    }
	    res.json({status: 200, result: result , books:books })
	});


    //requete mise a jour livres
    app.put('/api/v1/books/update/:id', withAuth, async (req, res, next)=>{
	    
	    let id = req.params.id
	    
	    let result = await bookModel.updateOneBook(req,id);
        let books = await bookModel.getAllBooks();

        //result.code permet d nous afficher le code de l erreur
	    if(result.code) {
	        res.json({status: 500, err: result});
	    }

        if(books.code){
	        res.json({status: 500, err: books})
	    }
	  
	    res.json({status: 200, result: result, books:books});
	})


	//requete delete livre
    app.delete('/api/v1/books/delete/:id', withAuth, async (req, res, next)=>{
	    
	    let id = req.params.id
	    let result = await bookModel.deleteOneBook(id);
        let books = await bookModel.getAllBooks();
	    
	    if(result.code) {
	        res.json({status: 500, err: result});
	    }
	  
        if(books.code){
	        res.json({status: 500, err: books})
	    }
	    res.json({status: 200, result: result, books:books});
	})

    //requete insertion photo base donné

    app.post('/api/livres/photo', withAuth, (req, res, next)=>{
		if(!req.files || Object.keys(req.files).length === 0) {
			res.json({status: 404, msg: "La photo n'a pas pu être récupérée"});
		}

		//mv on le chnage si on a un autre emplacement de dossier image
        //mv c est mouve l image ici
		req.files.image.mv('public/images/'+req.files.image.name, (err)=>{
			console.log('enregistré');
			if(err) {
				res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
			}
			res.json({status: 200, msg: 'ok', url: req.files.image.name});
		})
	})


	
	

}