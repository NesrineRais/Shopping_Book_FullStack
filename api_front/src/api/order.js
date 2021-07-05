import axios from 'axios';
import {config} from '../config'


export const saveOrder = (data)=>{
    const token = window.localStorage.getItem('b4y-token');
    return axios.post(config.api_url+'/api/v1/order/save', data, {headers: {"x-access-token": token}})
            .then((response)=>{
                return response.data; 
            })
}