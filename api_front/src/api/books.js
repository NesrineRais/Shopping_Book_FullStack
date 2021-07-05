import axios from 'axios';
import {config} from '../config';

//connexion avec la base pour affichage des donné de tous les contacts
//apres on l appel dans le component

export const getAllProducts = ()=> {
     return axios.get(config.api_url+'/api/v1/books/all')
     .then((books)=>{
         return books.data
        

         //je met apres ce qui est la dans le then(anonce) de anonce data dans le 2 then
     })
   
 
}
export const deleteOneProduct = (id)=>{
    const token = window.localStorage.getItem('b4y-token');

    return axios.delete(config.api_url+'/api/v1/books/delete/'+id, {headers: {"x-access-token": token}})
    .then((response)=>{

        return response.data
    })
    
}


export const addOneProduct = (data)=>{
    //on a rajoutr ca car on a protéger la route
    const token = window.localStorage.getItem('b4y-token');

    return axios.post(config.api_url+'/api/v1/books/save',data, {headers: {"x-access-token": token}})
    .then((response)=>{
        console.log(response.data)

        return response.data
    })
    
}

//pour récupérer l image

export const savePict = (file)=>{
    const token = window.localStorage.getItem('b4y-token');

    let formData = new FormData();//enregistrement nouveau format javascript native
    formData.append('image', file);
    
    return axios({
        method: "post",
        url: config.api_url+'/api/livres/photo',
        data: formData,
        headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-access-token": token
                }
    })
    .then((response)=>{
        return response.data;      
    })
}

export const editBook = (data, id)=>{
    const token = window.localStorage.getItem('b4y-token');
    return axios.put(config.api_url+'/api/v1/books/update/'+id, data, {headers: {"x-access-token": token}})
            .then((response)=>{
                return response.data; 
            })
}
