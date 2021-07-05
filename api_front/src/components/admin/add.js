import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getAllProducts,addOneProduct,savePict} from '../../api/books'
import {connect} from 'react-redux';
import {loadAllProducts} from '../../actions/products/bookAction';

class Add extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name : "",
            selectedFile: null, //!!! fais gaffe ici on met selected file
            //selected file c est l element qu on l entre avec insertion file
            description : "",
            quantity : "",
            price : "",
            error: null,
            redirect: false
        }
        console.log(this.props)
    }
    onSubmitForm(){
       
            savePict(this.state.selectedFile) //url le text
            .then((res)=>{
                console.log(res);
               
                //url c est le lien qu on le récupére dde l api quon rentre la fonction avec le paramétre selectedfile
                if(res.status === 200) {

                    let data={
                        name : this.state.name,
                        photo : res.url, //!!ici on met l url qu on la récupére de books api !le nom de la photo
                        //config.api_url+'/api/livres/photo',
                        description : this.state.description,
                        quantity : this.state.quantity,
                        price : this.state.price
                    }

                    addOneProduct(data)
                    .then((res)=>{
                        console.log(res)
                        if(res.status === 200) {
                            this.setState({redirect: true})
                            this.props.loadAllProducts(res.books)
                        }


                    })
                }
                
               
            })
     
       
    }
    render(){
        if(this.state.redirect) {
            return <Redirect to="/admin" />
        }
        return (
           <div>
               <h1>Add</h1>
               <form 
                    onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm()
                    }}
                     className="b-form">
                     <input 
                        type="text" 
                        placeholder="Nom de book" 
                        value={this.state.name}
                        onChange = {(e)=>{
                            this.setState({name:e.target.value})

                        }}
                        />
                     <input
                        type="file"
                        onChange={(e)=>{
                            this.setState({selectedFile: e.target.files[0]})
                        }}
                    />
                     <textarea 
                        type="text" 
                        name="description"
                        onChange = {(e)=>{
                            this.setState({description:e.target.value})

                        }}
                    >

                     </textarea>
                     <input 
                        type="text" 
                        placeholder="Quantité"
                        onChange = {(e)=>{
                            this.setState({quantity:parseInt(e.target.value)})

                        }}
                     />
                     <input 
                        type="text" 
                        placeholder="Prix de d'achat" 
                        onChange = {(e)=>{
                            this.setState({price:parseInt(e.target.value)})

                        }}
                        />
                     <input 
                        type="submit" 
                        name="Enregister" />

                </form>
           </div>
        )
    }
}
const mapStateToPros = (store)=>{
    return {
        item: store.books
    }
}

const mapDispatchToProps = {
    loadAllProducts

}


export default connect(mapStateToPros, mapDispatchToProps)(Add);
