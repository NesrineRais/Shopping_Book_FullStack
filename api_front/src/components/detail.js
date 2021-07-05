import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {modifyBasket} from '../actions/basket/bascketAction';
import {getAllProducts} from '../api/books'
import {config} from '../config'
import {connect} from 'react-redux';
import {loadAllProducts} from '../actions/products/bookAction';
import axios from 'axios';
import Popup from './modal';
class Products extends React.Component {
    constructor(props){
        super(props);
        this.state={
            book : null,
            error:null,
            isPopUp: false
        }
       
    }
    
    componentDidMount(){
        console.log(this.props)
    }

    render(){
        let id = this.props.match.params.id    

        console.log(this.props);
       let bookFilter = this.props.item.books.filter((book)=>{
           return book.id === parseInt(id)

       })
       let book = null;
       if(bookFilter.length>0){
             book = bookFilter[0]
       }
       

        let selectedBookIndex = this.props.cart.basket.findIndex((b)=>{
            //find index comme indexof 
            //mais index of c est pour un tableau simple et findindex
            //retourne un tableau d element
            return b.id === parseInt(id);
        })
        let quantityInBasket = 0;
        // je stock la quantité qui est déjà dans le panier dans la variable quantityInstock
        if(selectedBookIndex !== -1) {
            quantityInBasket = this.props.cart.basket[selectedBookIndex].quantitySelected;
        }
        return (
            
            <main>
                 <div>
                 <Popup 
                    isPopUp={this.state.isPopUp}
                    msg={"Vous avez ajouté : "+this.state.quantitySelected+" bières dans votre panier !"}
                    onClickClose={()=>{
                        this.setState({isPopUp: false, quantitySelected: ""})
                    }}
                />
                     <h1>Detail</h1>
                     <Link className="comeBack" to="/product"><i class="fa fa-arrow-circle-left"></i></Link>
                     {book !== null && <div className="beerDetail">
                        <img src={config.pict_url+book.photo} className="product-img"></img>
                        <h3>{book.name}</h3>
                        <p>{book.description}</p>
                        <div className="paymentPart">
                                <span>Prix Unitaire : <em>{book.price}€</em></span>
                                <div>
                              {this.state.error !== null && <p style={{color: 'red'}}>{this.state.error}</p>}
                            </div>
                                <form>
                                    <input type="text"
                                    onChange={(e)=>{
                                        this.setState({quantitySelected:parseInt(e.target.value)})
                                    }}
                                    className={this.state.error ? 'red-error':null}

                                      /> 
                                      
                                    <div className="addToBasket"
                                        onClick={(e)=>{
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
                                                    this.props.modifyBasket(book, this.state.quantitySelected, this.props.cart.basket);
                                                    this.setState({error: null,isPopUp: true})
                                                }
                                        
                                            } else {
                                            
                                                this.setState({error: "vous devez écrire un chiffre pour ajouter une quantité"})
                                            }
                                        }}
                                    
                                    >
                                        <i className="fa fa-plus-circle"></i>
                                    </div>
                                </form>
                        </div>
                     </div>}
                      
                     
                                  
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