import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../ultils/Form/FormField';
import './register.scss';
import Dialog from '@material-ui/core/Dialog';
import { update, generateData, ifFormValid } from '../ultils/Form/FormActions';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/user_action';
import MyButton from '../ultils/button'
import Layout from '../../hoc/layout';

class Register extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    last: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            email: {
                element: 'input',
                value: '',
                config: {
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
            },
            password: {
                element: 'input',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        },
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
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formError: false,
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.props.history.push('/register_login')
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
            <Layout>
            <div className="pape_wrapper">
                    <div className="row no-gutters">
                        <div className="col-xl-3 no-gutters"></div>
                        <div className="col-xl-6 no-gutters">
                            <div className="register_container">
                                <div className="register_login_container">
                                    <form className="register_form" onSubmit={(event => this.submitForm(event))}>
                                        <div className="register__tittle">Register</div>
                                        <div className="personal_info">Personal information</div>
                                        <div className="register__row1">

                                            <FormField
                                                id={'name'}
                                                formData={this.state.formData.name}
                                                //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                change={(element) => this.updateForm(element)}
                                            />


                                            <FormField
                                                id={'lastname'}
                                                formData={this.state.formData.lastname}
                                                //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                change={(element) => this.updateForm(element)}
                                            />

                                        </div>
                                        <div className="register__row2">
                                            <FormField
                                                id={'email'}
                                                formData={this.state.formData.email}
                                                //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                change={(element) => this.updateForm(element)}
                                            />
                                        </div>
                                        <div className="account_info">Acount information</div>
                                        <div className="register__row3">
                                            <FormField
                                                id={'password'}
                                                formData={this.state.formData.password}
                                                //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                change={(element) => this.updateForm(element)}
                                            />

                                            <FormField
                                                id={'confirmPassword'}
                                                formData={this.state.formData.confirmPassword}
                                                //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                                                change={(element) => this.updateForm(element)}
                                            />

                                        </div>
                                        <div className="register_row4">
                                            <MyButton
                                                type="default"
                                                title="Log in"
                                                linkTo="/register_login"
                                            />
                                            {this.state.formError ?
                                                <div className="errorLabel">
                                                    PLease check yoour data!
                                    </div>
                                                : ''}
                                            <button className='register_button' onClick={(event) => { this.submitForm(event) }}>Create account</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 no-gutters"></div>
                    </div>
                <Dialog open={this.state.formSuccess}>
                    <div classname="dialog_alert">
                        <div>Congratulation!!</div>
                        <div>You will be redirect to login in a couple of seconds....</div>
                    </div>
                </Dialog>
            </div>
            </Layout>
        );
    }
}

export default connect()(withRouter(Register));