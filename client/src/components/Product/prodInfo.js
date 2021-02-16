import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import MyButton from '../ultils/button';


import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

const ProdInfo = (props) => {
    
    const showProdTags = (detail) => (
        <div className="product_tags">
            {
                detail.shipping ?
                    <div className="tag">
                        <div>
                        <FontAwesomeIcon icon={faTruck}>
                        </FontAwesomeIcon>
                        </div>
                        <div className="tag_text">
                            <div>Free shipping and return</div>
                            <div></div>
                        </div>
                    </div>
                :null
            }{
                detail.available ?
                    <div className="tag">
                        <div>
                            <FontAwesomeIcon icon={faCheck}>
                            </FontAwesomeIcon>
                        </div>
                        <div className="tag_text">
                            <div>Available in store</div>
                            <div></div>
                        </div>
                    </div>
                :
                <div className="tag">
                    <div>
                        <FontAwesomeIcon icon={faCheck}>
                        </FontAwesomeIcon>
                    </div>
                    <div className="tag_text">
                            <div>Not Available, preorder only</div>
                        <div></div>
                    </div>
                </div>
            }
        </div>
    )
    const showProdActions = (detail) => (
         <div className="product_actions">
            <div className="price">
                $ {detail.price}
            </div>
            <div className="cart">
                <MyButton 
                    type="add_to_cart_link"
                    runAction={()=>{
                        props.addToCart(detail._id)
                    }}
                />
            </div>
         </div>
    )
    const showProdSpecifications = (detail) => (
        <div className="product_spectifications">
            {/* <h3>Specs</h3>
            <div>
                <div className="item">
                    <strong>Frets:</strong>{detail.frets}
                </div>
                <div className="item">
                    <strong>Wood:</strong>{detail.wood.name}
                </div>
            </div> */}
        </div>
    )
    const detail = props.detail;
    return (
        <div className="product_deatail">
            <h1 className="product_name">{detail.genus.name}
            <br/>{detail.name}</h1>
            <p className="product_description">
                {detail.description}
            </p>
            {
                showProdActions(detail)
            }
            {
                showProdTags(detail)
            }
        </div>
    )
}

export default ProdInfo;