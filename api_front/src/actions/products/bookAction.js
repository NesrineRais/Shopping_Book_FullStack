import {LOAD_ALL_PRODUCTS} from './actions-types';

export const loadAllProducts = (books)=>{
    return function(dispatch){
        dispatch({
            type: LOAD_ALL_PRODUCTS,
            payload: books
        })
    }
}

// export const removeBook = (item,)