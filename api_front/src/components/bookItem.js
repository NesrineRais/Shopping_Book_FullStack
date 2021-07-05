import React from 'react';
import {modifyBasket} from '../actions/basket/bascketAction';
import {loadAllProducts} from '../actions/products/bookAction';
import {getAllProducts} from '../api/books'
import {connect} from 'react-redux';
import {config} from '../config';
import {Link} from 'react-router-dom';
import Popup from './modal';

class BookItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantitySelected: "",
            error: null,
            isPopUp: false

        }
    }
    
    render(){
        let book = this.props.book;
        //=====================on a rajouter ca pour vérifier la quantité
         //ici dans l'item j'ai besoin de savoir si mon produit est déjà dans le panier
        // si oui j'ai son index dans this.props.cart.basket grâce à la fonction findIndex
        let selectedBookIndex = this.props.cart.basket.findIndex((b)=>{
            //find index comme indexof 
            //mais index of c est pour un tableau simple et findindex
            //retourne un tableau d element
            return b.id === book.id
        })
        //exmple de retour index sans findindex
          /*  let selectedBeerIndex;
        
        for(let i = 0; i < this.props.cart.basket.length; i++) {
            if(this.props.cart.basket[i].id === beer.id) {
                selectedBeerIndex = i;
            }
         //pour savoir l index de l objet dans le tableau de l objet

        }*/
        
        //coome si indexof d'un tableau retourne -1 si l element n est pas trouver dans le tableau
        let quantityInBasket = 0;
        // je stock la quantité qui est déjà dans le panier dans la variable quantityInstock
        if(selectedBookIndex !== -1) {
            quantityInBasket = this.props.cart.basket[selectedBookIndex].quantitySelected;
        }
        return (
            <li className="product-mosaic">
                 <Popup 
                    isPopUp={this.state.isPopUp}
                    msg={"Vous avez ajouté : "+this.state.quantitySelected+" bières dans votre panier !"}
                    onClickClose={()=>{
                        this.setState({isPopUp: false, quantitySelected: ""})
                    }}
                />
                <Link to={"/detail/"+book.id}>
                    <h3>{book.name}</h3>
                    <img src={config.pict_url+book.photo} className="product-img"></img>
                    <p>{book.description}</p>
                </Link>   
                <div>
                    {this.state.error !== null && <p style={{color: 'red'}}>{this.state.error}</p>}
                </div>
                <form >
                    <input type="text" 
                    
                    onChange={(e)=>{
                        this.setState({quantitySelected:parseInt(e.target.value)})

                    }}
                    className={this.state.error ? 'red-error':null}
             /> 
                            
                <div className="addToBasket" 
                onClick={(e)=>{
                        //Je fais passer les bonnes infos
                        if(!isNaN(this.state.quantitySelected) && this.state.quantitySelected !== "") {
                        // j'ai 3 infos : - la bière ajouté au panier
                        // - la quantité selectionné
                        // - le panier actuel avant ajout

                        // je regarde le total entre le stock dans le panier et la quantité de l'input
                        let total = parseInt(quantityInBasket) + parseInt(this.state.quantitySelected)
                    // si ce total est supérieur au stock en bdd alors on n'ajoute pas au panier.
                            if(total > book.quantity) {
                                console.log(parseInt(book.quantity) - parseInt(quantityInBasket))
                                    this.setState({error: "Il ne reste plus que "+(parseInt(book.quantity) - parseInt(quantityInBasket))+" en stock"})
                            } else {
                                console.log('popup')
                                this.props.modifyBasket(book, this.state.quantitySelected, this.props.cart.basket);
                                this.setState({error: null, isPopUp: true,})
                            }
                        
                        } else {
                        
                            this.setState({error: "vous devez écrire un chiffre pour ajouter une quantité"})
                        }
                        
                    }}>
                            <i className="fa fa-plus-circle"></i>
                        </div>
                    </form>
           </li>
            
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


export default connect(mapStateToProps,mapDispatchToProps)(BookItem);