//1per etape creation de user reducers apres action type et user action
//on veut stocké l admin connecté dans redux pour ne pas a chaque fois envoyé une requete a la base donné pour
//verification de la connexion
//on va donné l acce a la user 
//on va stocké les infos de l utilisateur pour vérifier si il est connecté ou pas
//on va stocké ca dans l action user
//pour que qu on va de page en page il y a plus de requtée vers la base donné 
//on va enregistrer le reducers les donné de users enregistré et comme ca on a allégé le serveur

import {CONNECT_USER, LOGOUT_USER} from '../actions/user/actions-types';

const initialState = {
    isLogged: false,
    infos: null
}

export default function UserReducer(state = initialState, action) {
    switch(action.type){
        case CONNECT_USER:
            return {isLogged: true, infos: action.payload}
        break
        
        case LOGOUT_USER:
            return initialState;
        break
    }
    
    return state;
}