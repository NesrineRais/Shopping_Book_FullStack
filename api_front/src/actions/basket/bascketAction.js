import {MODIFY_BASKET, REMOVE_TO_BASKET, CLEAN_BASKET} from './actions-types';

export const modifyBasket = (item, quantity, basket)=>{
    // variable qui détermine si la bière selectionné est déjà dans le panier ou pas 
    let isAlready = false;  
    // je boucle sur toutes les bière déjà présente dans le panier
    for(let i = 0; i < basket.length; i++) {
    // si la bière à ajouter est présente la condition sera true 
        if(basket[i].id === parseInt(item.id)) {
    
                // j'ajoute uniquement la quantité à la bière qui était déjà dans le panier
                let newQuantity = parseInt(basket[i].quantitySelected) + parseInt(quantity);
                basket[i].quantitySelected = newQuantity;
              
                isAlready = true;
            }
            
        }
        
     // Si il n'a pas trouvé de bière dans le panier
     // je l'ajoute directement dans le panier
     if(isAlready === false) {
           
            item.quantitySelected = parseInt(quantity);
            basket.push(item);
    } 
        
    
    // j'ajoute le panier dans le localstorage
    window.localStorage.setItem('books-basket', JSON.stringify(basket))
    return function(dispatch){
        dispatch({
            type: MODIFY_BASKET,
            payload: basket
        })
    }
}

export const removeToBasket = (item, basket)=>{
    
    let index;
    
    for(let i = 0; i < basket.length; i++) {
        if(basket[i].id === parseInt(item.id)) {
            index = i;
        }
    }
    
    basket.splice(index, 1);
    window.localStorage.setItem('books-basket', JSON.stringify(basket))

    return function(dispatch){
        dispatch({
            type: REMOVE_TO_BASKET,
            payload: basket
        })
    }
}
export const cleanBasket = ()=>{
    return function(dispatch){
    dispatch({
        type: CLEAN_BASKET,
        payload: null
    })
    }
}