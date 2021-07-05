import axios from 'axios';
import {config} from '../config'

export const checkToken = ()=>{
    //l appel de l api (la base donné) avec le front
    //la relation entre la base donné et le front pour rajouter l acces a l admin pour peut voir tous les 
    //annonce on dois vérifier si il est la bonne personne avec les boone login et pass
    //avec le token qu on la cérer coté back on vois tous ca dans resumer front
    //et la coté front on commence par créer l appel avec le requéte api qui récupére le
    //token qu on la enregistrer dans le local storage de naviguateur
    //apres on a fais l appel de ca dans le hook pour que sa soit dans tous le site l acces

    const token = window.localStorage.getItem('b4y-token');
    //dans axios le get dans le route back et data qu on va le metre dans header avec nom qu
    //la fais 'x-access-token' et on a mis dedant le token qu on la stoket dans local storage ave cle nom
    //b4y-token
    return axios.get(config.api_url+'/api/v1/auth/checkToken', {headers: {'x-access-token': token}})
            .then((response)=>{
                return response.data; 
            })
}