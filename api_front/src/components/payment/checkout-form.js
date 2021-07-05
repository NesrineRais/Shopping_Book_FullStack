import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from "axios";
import {config} from '../../config';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {saveOrder} from '../../api/order'
import {loadAllProducts} from '../../actions/products/bookAction';

// formulaire de carte bancaire
class CheckoutForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        redirect: false
      }
    }
    
    // lors de l'envoie du formulaire
    handleSubmit = async (event) => {
        event.preventDefault();
        
        let dataOrder = {
      		user_id: this.props.user.infos.id,
      		basket: this.props.cart.basket
      	}
    	
    	
    	console.log(dataOrder)
    	
    	let order = await saveOrder(dataOrder)
    	console.log(order)
        
        
        let data = {
            email: this.props.user.infos.email,
            order_id: order.order_id
        }
        console.log(data);
        let token = window.localStorage.getItem('b4y-token');
        //console.log(token);
        
        //gestion du paiement via stripe
        const paymentAuth = await axios.post(config.api_url+'/api/v1/order/payment', data, { headers: { 'x-access-token': token}});
        

        console.log(paymentAuth);
        const secret = paymentAuth.data.client_secret
        const payment = await this.props.stripe.confirmCardPayment(secret, {
                              payment_method: {
                                card: this.props.elements.getElement(CardElement),
                                billing_details: {
                                  email: this.props.user.infos.email
                                },
                              },
                            });
                
        // gestion en cas d'erreur            
        if (payment.error) {
            console.log(payment.error.message);
            
        } else {
            // si le paiement est un succes
            if (payment.paymentIntent.status === 'succeeded') {
                console.log('Money is in the bank!');
                let data2 = {
                  order_id: order.order_id,
                  status: "payed"
                }
                // on enregistre en bdd le status payed 
                axios.put(config.api_url+"/api/v1/order/validate", data2, { headers: { 'x-access-token': token }})
                .then((response)=>{
                    console.log(response);
                    this.setState({redirect: true})
                })
            }
        }
    }
    
    render() {
        if(this.state.redirect) {
          return <Redirect to="/success" />
        }
        const {stripe} = this.props;
        // 
        return (
          <form onSubmit={this.handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        );
      }

}


// branchement au store redux
const mapStateToProps = (store) => {
  return {
  	user: store.user,
  	cart: store.basket
  }
}
const mapDispatchToProps = {
	loadAllProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);