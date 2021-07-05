import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getAllProducts,addOneProduct,savePict,editBook} from '../../api/books'
import {connect} from 'react-redux';
import {loadAllProducts} from '../../actions/products/bookAction';

class EditBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           
            error: null,
            redirect: false
        }
        this.name="";
        this.description="";
        this.quantity="";
        this.price="";
        this.selectedFile= null;
    }
    
    onSubmitForm = ()=>{
        let id = this.props.match.params.id;

        if(this.selectedFile !== null) {
            savePict(this.state.selectedFile)
            .then((res)=>{
                console.log(res); 
                
                if(res.status === 200) {
                    
                    let data = {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        quantity: this.quantity,
                        photo: res.url
                    }
                    
                    editBook(data, id)
                        .then((bookRes)=>{
                            console.log(bookRes);
                            if(bookRes.status === 200) {
                                this.props.loadAllBeers(bookRes.books)
                                this.setState({redirect: true})
                            }
                        })
                    
                }
            })
        }else {
            let data = {
                        name: this.name,
                        description: this.description,
                        price: this.price,
                        quantity: this.quantity,
                        photo: this.photo
                    }
                    
                    editBook(data, id)
                            .then((bookRes)=>{
                            console.log(bookRes);
                            if(bookRes.status === 200) {
                                this.props.loadAllProducts(bookRes.books)
                                this.setState({redirect: true})
                            }
                        })
        }
        
    }
 
    render(){
        let id = this.props.match.params.id;
        let index;
        let book = null;
        if(this.props.item.books.length  > 0) {
            index = this.props.item.books.findIndex((b, index)=>{
                return b.id === parseInt(id)
            })
            
            if(index !== -1) {
                this.name = this.props.item.books[index].name;
                this.description = this.props.item.books[index].description;
                this.price = this.props.item.books[index].price;
                this.quantity = this.props.item.books[index].quantity;
                this.photo = this.props.item.books[index].photo;
            }
        }
        
        
        if(this.state.redirect) {
            return <Redirect to="/admin" />
        }
        
        return (
            <div>
                <h2>Ajoutez un produit</h2>
                <form
                    className="b-form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Nom de la bière"
                        defaultValue={this.name}
                        onChange={(e)=>{
                            this.name= e.target.value
                        }}
                    />
                    <input
                        type="file"
                        onChange={(e)=>{
                            this.selectedFile= e.target.files[0]
                        }}
                    />
                    <textarea
                        defaultValue={this.description}
                        onChange={(e)=>{
                            this.description= e.target.value;
                        }}
                    >
                    
                    </textarea>
                    <input
                        type="text"
                        defaultValue={this.price}
                        placeholder="Prix de la bière"
                        onChange={(e)=>{
                            this.price= e.target.value
                        }}
                    />
                    <input
                        type="text"
                        defaultValue={this.quantity}
                        placeholder="Quantité en stock de la bière"
                        onChange={(e)=>{
                            this.quantity= e.target.value
                        }}
                    />
                    <input type="submit" name="Enregister"/>
                </form>
            </div>
        )   
    }
    
}
    
    
const mapStateToProps = (store)=>{
    return {
        item: store.books
    }
}

const mapDispatchToProps = {
    loadAllProducts
}


export default connect(mapStateToProps, mapDispatchToProps)(EditBook);