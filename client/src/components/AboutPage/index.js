import React, { Component } from 'react';
import './aboutPage.scss';
import Layout from '../../hoc/layout';

class AboutPage extends Component {
    render() {
        return (
            <Layout>
                <div className="aboutPage">
                    <h2 className="about_title">About Us</h2>
                    <img className="image1" src='https://cdn.shopify.com/s/files/1/2528/3612/files/HPS-ourstory.jpg?v=1591748561'/>
                    <p>Our founders started out as a group of childhood friends that all had a passion for nature and the outdoors. Post college, they ended up becoming roommates. Turns out, having a home filled with plants was something they continued to have in common. Unfortunately, they found it difficult to find a place online to purchase houseplants that was easy to navigate and wasn’t just geared to wholesale. So, in 2017, they decided to launch HousePlantShop.com to be the ultimate destination for everything houseplants.
                    Originally working out of the humble house they shared, HousePlantShop.com has now grown to occupy a much larger and well equipped greenhouse based in Southern California.
                    Today, we still treat every order with the same care as we did working out of the small backyard and garage we started in.

                    From our house to yours,
                    The House Plant Shop Team
                    1952 Ren Circle, Unit A Tustin CA 92780
                    Tel: 888-341-2843
                    Email: info@houseplantshop.com</p>
                    <h2>We work with a small group of plant farmers around Southern California</h2>
                    <img className="image2" src="https://cdn.shopify.com/s/files/1/2528/3612/files/noun_897330_cc_large.png?v=1510092788" />
                    <p>Southern California has the optimal climate to grow healthy, strong indoor plants. With the help of local air plant and tropical plant farmers, we are able to supply the healthiest plants online. </p>
                    <h2>We've partnered with USPS and FEDEX to be able to ship your plants quickly and affordably</h2>
                    <img className="image3" src="https://cdn.shopify.com/s/files/1/2528/3612/files/noun_1215762_cc_large.png?v=1510091589"/>
                    <p>Our shipping operation works around the clock to fulfill your order. If a package is severely delayed due to the shipping carrier, or damaged upon arrival, please contact us directly. 
                    If for any reason you are not satisfied, just send us an email and we'll work with you to make things right.</p>
                </div>
            </Layout>
        );
    }
}

export default AboutPage;