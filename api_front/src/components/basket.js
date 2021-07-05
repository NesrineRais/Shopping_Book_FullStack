import React from 'react';
import {connect} from 'react-redux';
import {config} from '../config';
import {removeToBasket} from '../actions/basket/bascketAction';
import {saveOrder} from "../api/order";
import {Link} from 'react-router-dom';

class Basket extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }
    

	onClickOrder =()=>{
		let data = {
    		user_id: this.props.user.infos.id, //on a mis le contenu de user dans le reducer user.infos.id car un seul user
    		basket: this.props.cart.basket //on a mis le contenu de basket dans le reducer cart.basket
    	}
    	
    	
    	console.log(data)
    	
    	saveOrder(data)
    		.then((res)=>{
    			console.log(res);
    		})
	}

    render(){
        console.log(this.props.cart.basket)

        return (
            <main>
				<div>
					<h1>Panier</h1>
					<div id="displayBasket">
					{this.props.cart.basket.length > 0 && <table className="basketTable">

						<thead>
							<tr>
								<th>Quantité</th>
								<th>Nom</th>
								<th className="desktop">Prix Unitaire</th>
								<th>Prix Total</th>
								<th>Action</th>
							</tr>
						</thead>
						<tfoot>
							<tr>
								<td>Prix Total</td>
								<td></td>
								<td className="desktop"></td>
								<td><span id="totalPrice">{this.props.cart.totalAmount.toFixed(2)}</span> €</td>
								<td></td> 
							</tr>
						</tfoot>
						<tbody>
							{this.props.cart.basket.map((book, index)=>{
							return (<tr key={index}>
									<td>{book.quantitySelected}</td>
									<td>{book.name}</td>
									<td>{book.price.toFixed(2)} €</td>
									<td>{(parseFloat(book.price)*parseInt(book.quantitySelected)).toFixed(2)} €</td>
									<td>
										<button
											style={{backgroundColor: "red", border: 'none', padding: "10px 15px", borderRadius: "12px"}}
											onClick={()=>{
												this.props.removeToBasket(book, this.props.cart.basket);
											}}
										>
											<i className="fa fa-trash" style={{color: 'white'}}></i>
										</button>
									</td>
							</tr>)
							})}
						
						</tbody>
					</table>}

				{this.props.cart.basket.length === 0 && <p>Votre panier est vide</p>}
				{this.props.cart.basket.length > 0 && <div>
				{this.props.user.isLogged === true ? <Link to="/payment"><button>Payer</button></Link> : <Link to="/login"><button>Connectez vous pour payer</button></Link>}

				</div>}
				</div>
			</div>
         </main>
           
        )
    }
}
const mapStateToProps = (store)=>{
    return {
       item: store.books,
       cart: store.basket,
	   user: store.user //stocké dans redux
       //anonce ici on le trouve aussi dans index.js dans reducers 
       //on dois mettre la méme chose anonces: AdReducer
   }
}

const mapDispatchToProps = {
    removeToBasket
}


export default connect(mapStateToProps,mapDispatchToProps)(Basket);
