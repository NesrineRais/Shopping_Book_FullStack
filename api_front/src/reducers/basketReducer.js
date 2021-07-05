import {MODIFY_BASKET, REMOVE_TO_BASKET,CLEAN_BASKET} from '../actions/basket/actions-types'
// si j'ai déjà un panier enregistré dans le localstorage
// je le récupère
let lsBasket = JSON.parse(window.localStorage.getItem('books-basket'))
// si il n 'y a rien dans le localstorage ça nous renvoie null
if(lsBasket === null) {
    // si c'est null la valeur de base de mon panier sera un tableau vide 
    lsBasket = [];
}

function calculTotalAmount(basket){
    let totalAmount = 0;

    for(let i = 0; i < lsBasket.length; i++) {
        totalAmount += (parseInt(basket[i].quantitySelected) * parseFloat(basket[i].price))
    }
    
    return totalAmount;
}

let total = calculTotalAmount(lsBasket);




// je mets la valeur du LS dans le super state basket
const initialState = {
    basket: lsBasket,
    totalAmount: total

}


export default function BasketReducer(state=initialState, action){
    let total = 0;
    switch(action.type){
        // si action.type est bien le mot clef MODIFY_BASKET
        case MODIFY_BASKET:
            //on écrase le super state avec le "payload" de l'action
             total =  calculTotalAmount(action.payload);
        
            
            return {basket: action.payload, totalAmount: total} 
        break;
        case REMOVE_TO_BASKET:
            
                total =  calculTotalAmount(action.payload);
        
            
            return {basket: action.payload, totalAmount: total} 
        break;
        case CLEAN_BASKET:
            return {basket: [], totalAmount: 0} 
        break
    }
    return state;
}