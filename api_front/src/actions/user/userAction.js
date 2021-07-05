//etape 1 educer et etape 2 action
import {CONNECT_USER, LOGOUT_USER} from './actions-types'

export const connectUser = (user)=>{
    
    return function(dispatch){
        dispatch({
            type: CONNECT_USER,
            payload: user
        })
    }
}

export const logoutUser = (user)=>{
    
    return function(dispatch){
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}
