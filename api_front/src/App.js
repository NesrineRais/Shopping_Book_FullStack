import './App.css';
import Home from './components/home';
import Header from './components/header';
import Products from './components/products';
import Detail from './components/detail';
import Form from './components/user/form';
import Login from './components/user/login';
import Logout from './components/user/logout';
import Profil from './components/user/profil';
import Basket from './components/basket';
import Admin from './components/admin/admin';
import Add from './components/admin/add';
import Payment from './components/payment/payment'
import EditBook from './components/admin/editbook';
import Success from './components/payment/success'
import RequireDataAuth from './helpers/require-data-auth'
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <Header/>
      <Switch>

        <Route exact path="/" component={RequireDataAuth(Home)} />
        <Route exact path="/product" component={RequireDataAuth(Products)} />
        <Route exact path="/detail/:id" component={RequireDataAuth(Detail)} />
        <Route exact path="/admin/product/add" component={RequireDataAuth(Add, true)} />
        <Route exact path="/register" component={RequireDataAuth(Form)} />
        <Route exact path="/basket" component={RequireDataAuth(Basket)} />
        <Route exact path="/profil" component={RequireDataAuth(Profil)} />
        <Route exact path="/login" component={RequireDataAuth(Login)} />
        <Route exact path="/logout" component={RequireDataAuth(Logout)} />
        <Route exact path="/admin" component={RequireDataAuth(Admin, true)} />
        <Route exact path="/admin/editBook/:id" component={RequireDataAuth(EditBook, true)} />
        <Route exact path="/payment" component={RequireDataAuth(Payment, true)} />
        <Route exact path="/success" component={RequireDataAuth(Success, true)} />

        {/* {RequireDataAuth(Admin, true)
        true c est pour vérifier si connecté ou non}
        il prend le requireDataauth de helpers le hook qu il a créer pour qu il peut recperer 
        getAllProducts()tous les produis dans tous les page qu il a entourer avec require data */}
      </Switch>
    </div>
  );
}

export default App;
