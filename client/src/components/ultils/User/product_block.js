import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import React from 'react';
import { connect } from 'react-redux';
import './ProductBlock.scss';

const UserProductBlock = ({ products,type,removeItem}) => {
    
    const renderCartImage = (images) =>{
        if(images.length > 0){
            return images[0].url
        }else{
            return "https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png"
        }
    }

    const renderItems = () => (
        products.cartDetail ?
            products.cartDetail.map(product => (
                <div className="user_product_block" key={product._id}>
                    <div className="product_image">
                        <div
                            className="image"
                            style={{backgroundImage: `url(${renderCartImage(product.images)})`}}
                        ></div>
                    </div>
                    <div className="name">
                        <h4>Product name</h4>
                        <div>{product.genus.name}{product.name}</div>
                    </div>
                    <div className="quantity">
                        <h4>Quantity</h4>
                        <div>{product.quantity}</div>
                    </div>
                    <div className="price">
                        <h4>Price</h4>
                        <div>$ {product.price}</div>
                    </div>
                    <div className="btn">
                        <div className="cart_remove_btn" onClick={()=>removeItem(product._id)}>
                            remove
                        </div>
                    </div>
                </div>
            ))
        :null
    )

    return (
        <div>
           {
            products.cartDetail ?
                products.cartDetail.map(product => (
                    <div className="user_product_block" key={product._id}>
                        <div className="product_image">
                            <div
                                className="image"
                                style={{ 
                                    backgroundImage: `url(${renderCartImage(product.images)})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "10vh", 
                                }}
                            ></div>
                        </div>
                        <div className="name">
                            <div>{product.genus.name} {product.name}</div>
                        </div>
                        <div className="quantity">
                            <div>{product.quantity}</div>
                        </div>
                        <div className="price">
                            <div>${product.price}</div>
                        </div>
                        <div className="btn">
                            <div className="cart_remove_btn" onClick={()=>removeItem(product._id)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                        </div>
                    </div>
                ))
                : null
           }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserProductBlock);