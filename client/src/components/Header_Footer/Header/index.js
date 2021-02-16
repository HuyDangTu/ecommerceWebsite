import React, { Component } from 'react';
import './header.scss'
import Layout from '../../../hoc/layout';
import { Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../../../actions/user_action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCartPlus from '@fortawesome/fontawesome-free-solid/faCartPlus';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf'
import Search from '../../Search/index';

class Header extends Component {
    state = {
        page:[
            {
                name:'Home',
                linkTo:'/',
                public: true
            },
            {
                name: 'Shop',
                linkTo: '/shop',
                public: true
            },
            {
                name: 'About',
                linkTo: '/about',
                public: true
            },
            {
                name: 'Contact',
                linkTo: '/contact',
                public: true
            },
        ],
        user:[
            {
                name: 'My Cart',
                linkTo: '/users/cart',
                public: false
            },
            {
                name:'My Account',
                linkTo: '/users/transaction',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/users/logout',
                public: false
            }
        ]
    }
    logoutHandler = () =>{
        this.props.dispatch(logoutUser())
        .then(response => {
            if(response.payload.success){
                this.props.history.push('/')
            }
        })
    }


    defaultLink = (item,i) =>{
        if(item.name === 'Log out'){
            return(
                <div>
                    <Link to={item.linkTo} key={i}
                    onClick={() => this.logoutHandler()}>{item.name}</Link>
                </div>)
        } else if (item.name === 'My Account'){
            return (
                <div>
                <Link to={item.linkTo} key={i}>
                    <FontAwesomeIcon icon={faUser} />
                </Link>
                </div>)
        }else{
            return <Link to={item.linkTo} key={i}
                >{item.name}</Link>
        }
    }

    cartLink = (item,i) =>{
        const  user = this.props.user.userData

        return (
            <div key={i}>
                <span>{user.cart ? user.cart.length : 0}</span>
                <Link to={item.linkTo} key={i}>
                    <FontAwesomeIcon icon={faCartPlus} />
                </Link>
            </div>
        )
    }
    showLinks = (type) =>{
        let list = [];

        if(this.props.user.userData){
            type.forEach((item)=>{
                if(!this.props.user.userData.isAuth){
                    if(item.public === true){
                        list.push(item)
                    } 
                }else{
                    if(item.name!=='Log in'){
                        list.push(item)
                    }
                }
            })
        }

        return list.map((item,i) => {
            if(item.name !== 'My Cart'){
                return this.defaultLink(item,i)
            }else{
                return this.cartLink(item, i)
            }
        })
    }

    render() {
        return (
            <header className="header">    
                <div className="header__container container-fluid"> 
                    <div className="row no-gutters">
                        <div className="col-xl-2 no-gutters">
                            <div to="/" className="header__logo" >
                                <Link to={'/'}><FontAwesomeIcon icon={faLeaf} />Plant</Link>
                            </div>
                        </div>
                        <div className="col-xl-8 no-gutters">
                            <Search/>
                        </div>
                        <div className="col-xl-2 no-gutters">
                            <div className="cartButton"><Link to={'/users/cart'}><FontAwesomeIcon icon={faCartPlus}/></Link></div>
                        </div>
                    </div>
                    <div className="header_row2">
                        <div className="row no-gutters">
                            <div className="col-xl-4 no-gutters"></div>
                            <div className="col-xl-4 no-gutters">
                                <div className="header__nav-page">
                                    {this.showLinks(this.state.page)}
                                </div>
                            </div>
                            <div className="col-xl-4 no-gutters">
                                <div className="header__nav-user">
                                    {this.showLinks(this.state.user)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             
            </header>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Header));