import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../api/user'

class Profil extends React.Component {
    constructor(props){
        super(props)
       
        this.user = null;
        
         console.log(this.props)
    }
    onSubmitForm(){
        updateUser(this.user, this.user.id)
        .then((res)=>{
           console.log(res); 
        })
    }
    render(){
        this.user = this.props.user.infos
        return (
            <div>
               <h1>Mon profil</h1> 
               {this.user !== null && <form  className="b-form"
                onSubmit={(e)=>{
                   e.preventDefault()
                    this.onSubmitForm()
               }}
               >
                    <input
                        type="text"
                        placeholder="Prénom"
                        defaultValue={this.user.firstName}
                        onChange={(e)=>{
                            this.user.firstName = e.target.value
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        defaultValue={this.user.lastName}
                        onChange={(e)=>{
                            this.user.lastName = e.target.value
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Adresse"
                        defaultValue={this.user.address}
                        onChange={(e)=>{
                            this.user.address = e.target.value
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Code postal"
                        defaultValue={this.user.zip}
                        onChange={(e)=>{
                            this.user.zip = e.target.value
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Ville"
                        defaultValue={this.user.city}
                        onChange={(e)=>{
                            this.user.city = e.target.value
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Téléphone"
                        defaultValue={this.user.phone}
                        onChange={(e)=>{
                            this.user.phone = e.target.value
                        }}
                    />
                   
                    <input type="submit" name="Modifier"></input>
               </form>}
            </div>
        )
    }

}
const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps,mapDispatchToProps)(Profil);