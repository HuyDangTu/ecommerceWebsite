import React, {Component} from 'react'
import PageTop from '../ultils/PageTop';
import {connect} from 'react-redux';
import { getProductDetail, clearProductDetail } from '../../actions/product_actions';
import {addToCart} from '../../actions/user_action';
import ProImg from './prodImg';
import ProdInfo from './prodInfo';
import Layout from '../../hoc/layout';
import './productDetail.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

class ProductPage extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(response => {
            if(!this.props.products.prodDetail){
              this.props.history.push('/');
            }
        });
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail());
    }
    
    addToCartHandler(id) {
        this.props.dispatch(addToCart(id))
    }

    render(){
            return (
                <Layout>
                <div className="product_detail">
                    <PageTop 
                        title="Product detail"
                    />
                    <div className="product_detail_container">
                        {
                        this.props.products.prodDetail?
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div >
                                        {
                                            this.props.products.prodDetail.images?
                                                <ProImg
                                                    detail={this.props.products.prodDetail}
                                                />
                                            :""
                                        }
                                    </div>
                                </div>
                                <div className="right">
                                        {
                                            this.props.products.prodDetail._id ?
                                            <ProdInfo
                                                addToCart={(id)=>this.addToCartHandler(id)}
                                                detail={this.props.products.prodDetail}
                                            />
                                            : ""
                                        }
                                </div>
                            </div>
                        : <div className="CircularProgress">
                            <CircularProgress style={{ color: '#154100' }} thickness={7} />
                        </div>
                        }
                    </div>
                </div>
                </Layout>
            )
        }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(ProductPage);