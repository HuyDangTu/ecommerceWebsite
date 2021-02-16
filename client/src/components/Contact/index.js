import React, { Component } from 'react';
import Layout from '../../hoc/layout';
import './contactPage.scss';

class ContactPage extends Component {
    render() {
        return (
            <Layout>
                <div className="contactPage">
                    <h2 className="title">Send us the dirt!</h2>
                    
                    <div className="block">
                        <h2>Online Orders</h2>
                        <p>If you have any questions about your online order, send us an email or send us a note through the submission box below. Please include your order number and necessary information to resolve your issue.</p>
                        <p>Our customer service team is available every Mondays through Fridays from 10am till 6pm PST. Please give us 1-2 business days to get back to you.</p>
                        <p>You can also read our Frequently Asked Questions</p>
                    </div>
                    <div className="block">
                        <h2>Plant Care Help</h2>
                        <p>We love talking plants! Give us the dirt every Mondays through Fridays by emailing our Plant Care team for any plant health related questions. You can also join our Facebook Community Group to discuss anything house plant related. </p>
                     </div>
                  
                    <div className="block">
                        <h2>Trade Inquiries </h2>
                        <p>We operate wholesale and dropshipping services for business of all sizes. Email our wholesale team for wholesale, gifting, and dropshipping inquiries. </p>
                    </div>
                      <div className="block">
                        <h2>Partnership Inquiries</h2>
                        <p>Email our marketing team for partnership or collaboration inquiries. </p>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ContactPage;