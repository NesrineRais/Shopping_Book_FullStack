import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../../api/user';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            //je vais entrer un mail et pass
            password: "",
            error: null,
            redirect: false
        }
        console.log(this.props)
    }
    onSubmitForm = ()=> {
        let data = {
   
            email: this.state.email,
            password: this.state.password,
            //je vais entrer un mail et pass

     
        }

        //on trouve loginUser fonction dans le url de l api dans user.js pour verification de user
        //on fais l appel a la methode post de la base donné pour envoyer a la bse donné mes login et passsword
        //pour vérifier les donné de login et pasword entrer par champ avec ce qui est dans la password
        loginUser(data)
            .then((res)=>{
                console.log(res);
                window.localStorage.setItem('b4y-token', res.token);
                this.setState({redirect: true})
            })
        
    }
    render(){
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
           <div>
               <h1>Se connecter</h1>
               <form
                    className="b-form"
                    onSubmit={(e)=>{
                        e.preventDefault()
                        this.onSubmitForm();
                    }}
                >
                   
                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                    
                        onChange={(e)=>{
                            this.setState({email: e.target.value})
                            ///je vais entrer un login et password
                            //on fais appel a la post pour poster ca dans le base donné
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={this.state.password}
                        onChange={(e)=>{
                            this.setState({password: e.target.value})
                        }}
                    />
                    
                    <input type="submit" name="Enregister"/>
                </form>
           </div>
        )
    }
}

export default Login;