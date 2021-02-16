import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/index'
import Auth from './hoc/auth';
import RegisterLogin from './components/Register_login/index'
import Register from './components/Register_login/register'
import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_project'
import Shop from './components/Shop';
import ManageCategory from './components/User/Admin/ManageCategory';
import ProductPage from './components/Product';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';
import ManageSite from './components/User/Admin/manage_site';
import AboutPage from './components/AboutPage/index';
import ContactPage from './components/Contact/index';

const Routes = () =>{ 
  return(
    <Switch>   
          <Route path="/users/transaction" exact component={Auth(UserDashboard, true)} />
          <Route path="/users/cart" exact component={Auth(UserCart, true)} />
          <Route path="/users/user_profile" exact component={Auth(UpdateProfile, true)} />
          
          <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
          <Route path="/admin/manage_categories" exact component={Auth(ManageCategory, true)} />  
          <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />  
          <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
          
          <Route path="/" exact component={Auth(Home, null)} />
          <Route path="/register" exact component={Auth(Register, false)} />
          <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
          <Route path="/about" exact component={Auth(AboutPage, false)} />  
          <Route path="/Shop" exact component={Auth(Shop, null)} />
          <Route path="/contact" exact component={Auth(ContactPage,null)}/>
    </Switch>
  )
}

export default Routes;
