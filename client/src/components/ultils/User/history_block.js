import React, { Component } from 'react';
import moment from 'moment';
import './historyPurhased.scss';

const UserHistoryBlock = (props) => {

    const renderBlocks = () => (
        props.products ? 
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
        : null
    )
   
    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <td>Date of purchase</td>
                        <td>Product</td>
                        <td>Price paid</td>
                        <td>Quantity</td>
                    </tr>
                </thead>
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    );

}

export default UserHistoryBlock;