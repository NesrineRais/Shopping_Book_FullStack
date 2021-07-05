import { combineReducers } from "redux";
import BookReducer from './bookReducer';
import BasketReducer from './basketReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
    books: BookReducer,
       //anonce ici on le trouve aussi dans home.js dans component dans 
       //const mapStateToProps = (store)=>{ return { item: store.anonces 
    basket: BasketReducer,
    user: UserReducer
        

});

export default rootReducer;
