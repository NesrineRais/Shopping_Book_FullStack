import React from 'react';
import {Link} from 'react-router-dom';
import { saveUser } from '../../api/user';

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            city: "",
            zip: "",
            phone: "",
            error: null,
            redirect: false
        }
    }
    onSubmitForm = () =>{
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            city: this.state.city,
            zip: this.state.zip,
            phone: this.state.phone
        }
        console.log(data)


        saveUser(data)
            .then((res)=>{
                console.log(res)
                if(res.status=== 200) {
                    this.setState({redirect: true})
                }
            })
    }
    render(){
        return (
           <div>
               <h1>Form</h1>
               {this.state.error !== null && <p style={{color: "red"}}>{this.state.error}</p>}
               <form  className="b-form"
               onSubmit={(e)=>{
                   e.preventDefault();
                   this.onSubmitForm();
               }}
               >
                    <div>
                        <input 
                           
                            type="text"
                            placeholder = "votre prenom"
                            value={this.state.firstName}
                            onChange= {(e)=>{
                                this.setState({firstName:e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            

                            type="text"
                            placeholder = "Votre Nom"
                            value={this.state.lastName}
                            onChange= {(e)=>{
                                this.setState({lastName:e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder = "Votre Email"
                            value={this.state.email}
                            onChange={(e)=>{
                                this.setState({email: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            placeholder = "Votre password"
                            value={this.state.password}
                            onChange= {(e)=>{
                                this.setState({password:e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder = "Votre adress"
                            value={this.state.address}
                            onChange={(e)=>{
                                this.setState({address: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder = "Votre ville"
                            value={this.state.city}
                            onChange={(e)=>{
                                this.setState({city: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder = "Votre code postal"
                            value={this.state.zip}
                            onChange={(e)=>{
                                this.setState({zip: e.target.value})
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder = "Votre phone"
                            value={this.state.phone}
                            onChange={(e)=>{
                                this.setState({phone: e.target.value})
                            }}
                        />
                    </div>
                    <input type="submit" name="Enregister"/>
               </form>
           </div>
        )
    }
}

export default Form;