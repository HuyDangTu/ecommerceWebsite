import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import { getCartItem, removeCartItem, onSuccessBuy } from '../../actions/user_action';
import {connect} from 'react-redux';
import UserProductBlock from '../ultils/User/product_block';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import faCheckCircle from '@fortawesome/fontawesome-free-solid/faCheckCircle';
import Paypal from '../ultils/Paypal';
import './cart.scss';

/// AaC3qSblXLg4G96tSaOssYNpSfIxVTDW3WpqGH2nLItWtua99s5PsqJy6UtfNybJRWTSnVCLV_LD_DYa

class UserCard extends Component {

    state = {
        loading: true,
        total: 0,
        showTotal:  false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItem = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length){
                user.userData.cart.forEach((item)=>{
                    cartItem.push(item.id);
                })
                this.props.dispatch(getCartItem(cartItem,user.userData.cart))
                .then(()=>{
                    if(this.props.user.userData.cartDetail.length > 0){
                        this.calculateTotal(this.props.user.userData.cartDetail)
                    }
                })
            }
        }
    }
    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.userData.cartDetail.length <= 0){
                this.setState({
                    showTotal: false
                })
            }else{
                this.calculateTotal(this.props.user.userData.cartDetail)
            }
        })
    }

    calculateTotal = (cartDetail) =>{
        console.log("here", cartDetail)
        let total = 0;
        console.log(cartDetail)
        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity
        });

        this.setState({
            total,
            showTotal: true
        })
    }

    showItemMessage = () => (
        <div className = "cart_no_items">
            <FontAwesomeIcon size="3x" icon={faFrown} />
            <div className="message">
                YOU HAVE NO ITEM!
            </div>
        </div>
    )


    transactionError = () => {
        console.log('Paypal error')
    }
    
    transactionCanceled = () => {
        console.log('Paypal error')
    }

    transactionSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.userData.cartDetail,
            paymentData: data
        })).then((response)=>{
            console.log(response)
            if(this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <UserProductBlock 
                            products={this.props.user.userData}
                            type="cart"
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {this.state.showTotal ? 
                            <div className="uesr_cart_sum">
                                <div>
                                    Total amount: $ {this.state.total}
                                </div>
                            </div>
                        : this.state.showSuccess ? 
                            <div className="cart_success">
                                    <FontAwesomeIcon size="3x" icon={faCheckCircle} />
                                    <div className="message" >
                                        THANK YOU, YOUR ORDER IS NOW COMPLETE
                                    </div>
                            </div>
                        :this.showItemMessage()}
                    </div>
                    {
                        this.state.showTotal?
                            <div className="paypal_button">
                                <Paypal 
                                    toPay={this.state.total}
                                    transactionError={(data)=> this.transactionError(data)}
                                    transactionCanceled={(data) => this.transactionCanceled(data)}
                                    onSuccess={(data)=>this.transactionSuccess(data)}
                                />
                            </div>
                        :null
                    }
                </div>
            </UserLayout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UserCard);