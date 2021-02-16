import React, { Component } from 'react';
import FormField from '../ultils/Form/FormField';
import { connect } from 'react-redux';
import { update, generateData, ifFormValid, populateFields } from '../ultils/Form/FormActions';
import { updateUserData, clearUpdateUser, updateUserPassword } from '../../actions/user_action';
import './update_password.scss';

class UpdatePassword extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formData: {
            password: {
                element: 'input',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter new password'
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
                    placeholder: 'Confirm new password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
            oldPassword: {
                element: 'input',
                config: {
                    name: 'old_password_input',
                    type: 'password',
                    placeholder: 'Enter current password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formData, 'update_user');
        this.setState({
            formError: false,
            formData: newFormdata
        });
    }

    submitForm = (event) => {

        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData, 'update_password');
        let formIsValid = ifFormValid(this.state.formData, 'update_password');

        if (formIsValid) {
            console.log(dataToSubmit)
            this.props.dispatch(updateUserPassword(dataToSubmit))
                .then(response => {
                    console.log(response)
                    if (response.payload.success) {
                        this.setState({
                            formSuccess: true
                        });
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUser())
                            this.setState({
                                formSuccess: false
                            })
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
            <div className="update_password">
                <form onSubmit={(event => this.submitForm(event))}>
                    <div className="register__row1">
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
                        <FormField
                            id={'oldPassword'}
                            formData={this.state.formData.oldPassword}
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
                        <button className='register_button' onClick={(event) => { this.submitForm(event) }}>Update</button>
                    </div>
                </form>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UpdatePassword);