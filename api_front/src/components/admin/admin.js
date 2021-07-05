import React from 'react';
import {Link} from 'react-router-dom';
import {getAllProducts,deleteOneProduct} from '../../api/books'
import {config} from '../../config'
import {connect} from 'react-redux';
import {loadAllProducts} from '../../actions/products/bookAction';
import axios from 'axios';


class Admin extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            books : [],
           
        }
    }
    componentDidMount(){
        console.log(this.props)

    }
    onSubmitDelete = (id)=>{
        deleteOneProduct(id)
        .then((res)=>{
            if(res.status === 200) {
                this.props.loadAllProducts(res.books);
            } 
        })
        
          
        
    }
    
    render(){
      
        return (
            <main>
                <div>
                    <h1>Admin</h1>
                    <Link to="/admin/product/add" className="addBeer">Ajouter un livre</Link>
                    <h3>Tableau des books</h3>
                    <table className="tableBeer">
                     <tbody>   
                          <tr>
                             <td>Image</td>
                              <td>Nom</td>
                              <td>Action</td>
                                    
                             </tr>
                        { this.props.item.books.map((book,index)=>{
                             return(
                                   <tr>
                                        <td>
                                            <img src={config.pict_url+book.photo} className="admin-img" />
                                        </td>
                                        <td>
                                            {book.name}
                                        </td>
                                        <td>
                                            <Link to={"/admin/editBook/"+book.id}>Edit</Link>
                                            <button
                                              
                                                onClick={()=>{
                                                    this.onSubmitDelete(book.id);
                                                }}

                                                
                                            >
                                            Supprimer
                                            </button>
                                        </td>
                                     </tr>
                                    )
                                 })}
                              </tbody>  
                          </table>          

                  
                </div>
            </main>
           
        )
    }
}
const mapStateToProps = (store)=>{
    return {
       item: store.books
       //anonce ici on le trouve aussi dans index.js dans reducers 
       //on dois mettre la méme chose anonces: AdReducer
   }
}

const mapDispatchToProps = {
    loadAllProducts

}



export default connect(mapStateToProps,mapDispatchToProps)(Admin);
