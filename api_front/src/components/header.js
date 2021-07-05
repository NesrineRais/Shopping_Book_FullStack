import logo from '../media/logo.jpg';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {logoutUser} from '../actions/user/userAction';
class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
			redirect: false
		}
    }
    
    render(){
        if(this.state.redirect) {
			return <Redirect to="/"
                
            />
		}
        return (
           
                <div className="header-nav">
                    <nav>
                        <div className="list1">
                            <img src={logo}></img>
                             <Link to="/">Accueil</Link>
                            <Link to="/product">Produits</Link> 
                        </div>
                        <div className="list2">
                            

                            {this.props.user.isLogged === true && <Link to="/admin">Admin</Link>}
                            {this.props.user.isLogged === false && <Link to="/register">S'enregistrer</Link>}
                            {this.props.user.isLogged === false && <Link to="/login">Se connecter</Link>}
                            {this.props.user.isLogged === true && <Link to="/logout">Déconnexion</Link>}
                            {this.props.user.isLogged === true && <Link to="/profil">{this.props.user.infos.firstName}</Link>}
                            <Link to="/basket">Panier</Link>

                        </div>
                    </nav>
                    <div class="header-pict">
                        <div class="background_opacity"></div>
                        <h1>Vendre ses livres rapidement
                            Offrez une nouvelle vie à vos livres
                        </h1>
                    </div>
                </div>
               
           
        )
    }
}

const mapStateToProps = (store) => {
    return {
       user: store.user
    }
  }
  const mapDispatchToProps = {
      logoutUser
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);