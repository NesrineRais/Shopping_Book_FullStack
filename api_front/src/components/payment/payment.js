import React from 'react';
import CheckoutForm from './checkout-form'
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';

// page de paiement
class Payment extends React.Component {
	constructor(props){
		super(props)
	}

	InjectedCheckoutForm = ()=>{
		// chargement du formulaire de carte bleue
		return (
			<ElementsConsumer>
			    {({stripe, elements}) => (
			      <CheckoutForm orderId={this.props.match.params.orderId} stripe={stripe} elements={elements} />
			    )}
			</ElementsConsumer>

		)
	}

	render(){
		const stripePromise = loadStripe('pk_test_51J05KyEpi8YwUxDGG2zateJQdnU7yOyWcCKmkEjSrCvgC7P3yGsGLJtUoC4zxJjgpzsb88mBzIIfKyQJ2gwNqRtr00Ad964qtg');

		return (
			<div>
				<h2>Paiement</h2>
				<div className="formStripe">
					<Elements stripe={stripePromise}>
						{this.InjectedCheckoutForm()}
					</Elements>
				</div>
				
			</div>
		)
	}
}

export default Payment;