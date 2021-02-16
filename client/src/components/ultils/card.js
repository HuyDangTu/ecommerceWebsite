import React, { Component } from 'react';
import MyButton from '../ultils/button';
import './card.scss';

import {connect} from 'react-redux';
import {addToCart} from '../../actions/user_action';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

class  Card extends Component {
    
    renderCardImage(images){
        if(images.length > 0){
            return images[0].url
        }else{
            return 'https://cdn.shopify.com/s/files/1/0013/3529/6118/products/Terracotta-Pot-6_Sansevieria-Zeylanica-6.jpg?v=1544979697';
            
        }
    }
    
    render() {
        const props = this.props;
        return (
          
            <div className = {`${props.grid}`}>
            <div className="card_item_wrapper">
                <div className='item_image'
                    style={{
                        background: `url(${this.renderCardImage(props.images)})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                ></div>
                <div className= 'card_action_container'>
                    <div className="tags">
                        <div className='tags_container'>
                            <div className="name">
                                {props.name}
                            </div>
                            <div className="price">
                                ${props.price}
                            </div>
                            {
                                props.grid ?
                                <div className="description">
                                    {props.description}
                                </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
               
                <div className="actions">
                    <div className="button_wrapp">
                        <MyButton
                        type="default"
                        altClass="card_link"
                        title="View product"
                        linkTo={`product_detail/${props._id}`}
                        addStyle={{
                            margin: '10px 0 0 0'
                            }}></MyButton>
                    </div>
                    <div className="button_wrapp">
                        <MyButton
                            type="bag_link"
                            runAction={()=>{
                               this.props.user.userData.isAuth ?
                                   props.dispatch(addToCart(props._id))
                               :console.log("u need to login");
                            }}
                            ></MyButton>
                    </div>
                </div>
                
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);