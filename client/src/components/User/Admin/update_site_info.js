import React, { Component } from 'react';
import FormField from '../../ultils/Form/FormField';
import { connect } from 'react-redux';
import { update, generateData, ifFormValid, populateFields } from '../../ultils/Form/FormActions';
import { getSiteData, updateSiteData } from '../../../actions/site_action';
import './update_site_info.scss';

class UpdateSiteInfo extends Component {

    state = {
        formError: false,
        formSuccess: false,
        formData: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter address'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            hour: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hour_input',
                    type: 'text',
                    placeholder: 'Enter working hour'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter phone number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
        }
    }


    componentDidMount(){
        this.props.dispatch(getSiteData()).then(()=>{
            console.log(this.props.site.siteData[0])
            const newFormData = populateFields(this.state.formData,this.props.site.siteData[0].siteInfo[0]);
            this.setState({
                formdata: newFormData
            })
        })    
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formData, 'register');
        this.setState({
            formError: false,
            formData: newFormdata
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'register');

        let formIsValid = ifFormValid(this.state.formData, 'register');

        if (formIsValid) {
            console.log("")
            this.props.dispatch(updateSiteData(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.setState({formSuccess: false})
                        }, 3000);
                    } else {
                        this.setState({ formError: true });
                    }
                }).catch(e => {
                    this.setState({ formError: true })
                })
        }
        else {
            this.setState({
                formError: true
            })

        }
    }

    render() {
        return (
            <div className="site_info">
                <form onSubmit={(event => this.submitForm(event))}>
                    <div className="title">Site Information</div>
                    <div className="register__row1">
                        <FormField
                            id={'address'}
                            formData={this.state.formData.address}
                            //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'hour'}
                            formData={this.state.formData.hour}
                            //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'phone'}
                            formData={this.state.formData.phone}
                            //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div>
                        <FormField
                            id={'email'}
                            formData={this.state.formData.email}
                            //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                : ''
                        }
                        {this.state.formError ?
                            <div className="errorLabel">
                                PLease check your data!
                                    </div>
                            : ''
                        }
                        <button className='register_button' onClick={(event) => { this.submitForm(event) }}>Update site info</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(UpdateSiteInfo);