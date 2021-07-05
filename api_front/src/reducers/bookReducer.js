import { LOAD_ALL_PRODUCTS } from "../actions/products/actions-types";

const initialState = {
    books: []
}


export default function BookReducer(state=initialState, action) {
    // il faut ajouter l action pour voir tous le tableau dans switch
    switch(action.type){
        case LOAD_ALL_PRODUCTS:
            return {books: action.payload}
        break;
    }
    return state;
}