import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    
    render() {


        const onSuccess = (payment) =>{
            this.props.onSuccess(payment)
            //console.log(JSON.stringify(payment))
        }

        const onCancel = (data) => {
            console.log(JSON.stringify(data))
        }

        const onError = (err) =>{
            console.log(JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            sandbox: 'AaC3qSblXLg4G96tSaOssYNpSfIxVTDW3WpqGH2nLItWtua99s5PsqJy6UtfNybJRWTSnVCLV_LD_DYa',
            production: ''
        }

        

        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect( mapStateToProps,)(Paypal);