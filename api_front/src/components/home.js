import React from 'react';
import {Link} from 'react-router-dom';
import home_image from '../media/presse-kiwibook.png';
import {getAllProduct} from '../api/books'
import {config} from '../config'


class Home extends React.Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return (
            <main>
                 <div>
                    <p id="home-presentation">Acheter vos livres d'occasion à petits prix
                            Avec une qualité irréprochable  !
                            <br></br>
                            Kiwibook est une société française créée dans le sud de la France en 2017. Bien que Kiwibook soit une société récente, nous avons déjà conquis des dizaines de milliers de clients satisfaits grâce à la qualité de nos livres et  de nos services.
                            <br></br>
                            Ce qui nous différencie avant tout : Nos prix défiant toutes concurrences.
                            <br></br>
                            Les prix les plus bas avant tout !
                            Toute l'équipe de Kiwibook n'a qu'une seule vocation : rendre la culture accessible à tous en proposant les prix les plus bas possible.
                            <br></br>
                            A ce jour plus de 75% des livres que nous proposons  sur Kiwibook  sont les moins cher du web ... tous sites confondus.</p>
                            <img src={home_image} id="homerHome"/>
                 </div>
            </main>
          
        )
    }
}

export default Home;