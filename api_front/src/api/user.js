import axios from 'axios';
import {config} from '../config';

//connexion avec la base pour affichage des donné de tous les contacts
//apres on l appel dans le component

export const saveUser = (data)=> {
     //console.log(this.props);
     return axios.post(config.api_url+'/api/v1/users/save',data)
     .then((response)=>{
         console.log(response.data)
         return response.data
         //je met apres ce qui est la dans le then(anonce) de anonce data dans le 2 then
     })
   
 
}

export const loginUser = (data)=> {
    //console.log(this.props);
    return axios.post(config.api_url+'/api/v1/users/login',data)
    .then((response)=>{
        console.log(response.data)
        return response.data
        //je met apres ce qui est la dans le then(anonce) de anonce data dans le 2 then
    })
  

}

export const updateUser = (data, id)=>{
    const token = window.localStorage.getItem('b4y-token');
    return axios.put(config.api_url+'/api/v1/users/update/'+id, data, {headers: {"x-access-token": token}})
            .then((response)=>{
                return response.data; 
            })
}
