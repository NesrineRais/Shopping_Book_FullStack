import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {getAllProducts} from '../api/books'
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllProducts} from '../actions/products/bookAction';
import {modifyBasket} from '../actions/basket/bascketAction';
import BookItem from './bookItem'

import axios from 'axios';
import bookItem from './bookItem';
class Products extends React.Component {
    constructor(props){
        super(props)
        this.quantitySelected = [];
       this.state = {
            quantity : "",
            show: false,
            error: null
       }
      
    }
    
     
    componentDidMount(){
        
           //on ajouter helpers pour mettre le component did mount de getallproduct dans un
           //composant générique qu on la appeler require data pour si on veut voir tous les
           //produit juste en ajoute requiredata dans app.js et on la ppel ici
          //dans helpers on a hook qui récupére les books et les mis dans item books
          //de redux
          

    }
   
    
    render(){
        // créer un tableau indépendant qui a la même valeur que this.props.item.beers;
       //this.books = [...this.props.item.books]
       
       // je crée un tableau this.quantitySelected qui a le même nombre d'index qu this.props.item.beers
        
        // this.props.item.books.map((books, index)=>{
        //     this.quantitySelected.push(null);
        // })
        // console.log(this.quantitySelected);
        //console.log(this.props)

        return (
            <main>
                 <div>
               <h1>Produits</h1>
              
               <ul>
                   { // chaque bière sera affiché dans un component BeerItem 
                        // je fais passer les infos de la bière en props beer={beer}
                        this.props.item.books.map((book,index)=>{
                       return(
                           
                         <BookItem key={index} book={book} />
                          
                       )
                    })}
                  
               </ul>
           </div>
           
           

            
        </main>
          
        )
    }
}

const mapStateToProps = (store)=>{
    return {
       item: store.books,
       cart: store.basket
       //anonce ici on le trouve aussi dans index.js dans reducers 
       //on dois mettre la méme chose anonces: AdReducer
   }
}

const mapDispatchToProps = {
    loadAllProducts,
    modifyBasket
}


export default connect(mapStateToProps,mapDispatchToProps)(Products);