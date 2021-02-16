import React, { Component } from 'react';
import Layout from '../../hoc/layout';
import HomeSlider from './home_slider'
import HomePromotion from './home_promotion'
import {connect} from 'react-redux'
import {getProductsByArrival, getProductsBySell} from '../../actions/product_actions'
import CardBlock from '../ultils/car_block'
import Banner from './banner';

class Home extends Component {
    
    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }
    render() {
        return (
            <Layout>
                <div>
                    <HomeSlider />
                    <Banner/>
                    <CardBlock title='BEST SELLING PLANTS' 
                        list={this.props.products.bySell}/>
                    <HomePromotion />
                    <CardBlock title='NEW ARRIVAL'
                        list={this.props.products.byArrival} />
              
                </div>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);