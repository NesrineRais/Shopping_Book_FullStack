import React from 'react';
import {getAllProducts} from '../api/books'
import {checkToken} from '../api/auth'
import {connect} from 'react-redux';
import {loadAllProducts} from '../actions/products/bookAction';
import {Redirect,Link} from 'react-router-dom';
import {connectUser} from '../actions/user/userAction';

//on a rajouter dans le lien de la page ou on va
//recuperer tous les produicts le parametre withauth c est avec authentification
//si la personne authentifier il peut voir les produit
//dans  le didmount on a fait la condition 
//et dans render le retour a la page login si nest pas conncetr
//si on click sur admin vas retourner au login
//on rajouter parametre true dans le app.js de l admin
export default function(ChildComponent, withAuth=false) {

    class RequireDataAuth extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                redirect: false
                //on rajouter la redirect pour que si t es pas connecté tu peux pas acceder
                //au lien admin
                //ton mot de pass va étre enregistrer dans le local storage
            }
        }
        componentDidMount(){
            //console.log('require did mount',this.props)
            //vérification pour charger tous les books
            if(this.props.item.books.length === 0) {   
                //console.log('JE suis dans le hook componentdid mount est je CHARGE LES books');
                getAllProducts()
                .then((res)=>{
                    //console.log("res pour voir le resultat de l appel de l api",res)
                    this.props.loadAllProducts(res.books)
                    console.log(res);
                    //on a entrer ici dans le data book de axios le book redux qu on la créer 
                })
            }

            const token = window.localStorage.getItem('b4y-token');
            console.log("token",token);

            // je teste si l'utilisateur est connecté si oui il a accès à tout
            if(this.props.user.isLogged === false) {//par defaut on a is logged est non
                //this.props.user.isLogged ca viens de redux props user qu on la créer 
                //il y a un resumer dans reducers user
                //c est l appel de l url de l api 
                //withAuth === true
                //qui permet de faire la requete avec la base de donné
                 // si pas connecté pas de token dans le local storage
                
                //condiiton si on est pas logé loged=false et le token il y a pas et withauth ets activé
                //alors on dois avoir le droit de se conecté alors reidrection

                 if(token === null) {
                    // si besoin d'etre connecté alors redirigé
                    if(withAuth) {//exemple page elle a withauth=true alors elle dois étre connecté
                     this.setState({redirect: true})
                    }
                } else {
                   // si il y a un token on teste
                    checkToken()
                        .then((res)=>{
                            //la requete pour voir qu on est connecté
                           // console.log(res); 
                            if(res.status !== 200) {
                                //si la personne est en status 400 il n a pas mis le bon login
                                
                                //et il est dois etre logé avec withauth
                                if(withAuth) {
                                   //il dois étre logé pour voir la page
                                    this.setState({redirect: true}) 
                                 }
                            }
                            //si status 200 dans la base tout est ok
                            else{
                                //connecté il a enregister ses donné dans le local storage
                                //il peut acceder a les produits si non il dois rediriger ves login
                                this.props.connectUser(res.user); //on a récupérer sa de redux 
                                //redux user pour stocké la connection de user
                            }
                        })
                }
            }
        }

        render(){
            if(this.state.redirect) { //on peut pas mettre true au lieu de this.state.redirect == true
                return <Redirect to="/login"/>
            }
            return (
                <ChildComponent {...this.props} />  
            )
        }
    }
    

    const mapStateToProps = (store)=>{
        return {
           item: store.books,
           //anonce ici on le trouve aussi dans index.js dans reducers 
           //on dois mettre la méme chose anonces: AdReducer
           user: store.user
       }
    }
    
    const mapDispatchToProps = {
        loadAllProducts,
        connectUser
    }
    
    return connect(mapStateToProps,mapDispatchToProps)(RequireDataAuth);
    //retour de la class
}