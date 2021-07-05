import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {cleanBasket} from "../../actions/basket/bascketAction";

class Success extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        window.localStorage.removeItem('books-basket');
        this.props.cleanBasket();
    }
    
    render(){
        return(
            <div>
                <p>Félication votre commande est bien passée !</p>
                <Link to="/">Revenir à l'accueil</Link>
            </div>
        )
    }
}


const mapStateToProps = (store) => {
  return {
  	user: store.user,
  	cart: store.basket
  }
}
const mapDispatchToProps = {
	cleanBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);