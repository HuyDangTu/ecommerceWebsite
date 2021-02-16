import React, { Component } from 'react';
import FormField from '../ultils/Form/FormField';
import { connect } from 'react-redux';
import { update, generateData, ifFormValid, populateFields } from '../ultils/Form/FormActions';
import { updateUserData, clearUpdateUser} from '../../actions/user_action';
import './update_personal_info.scss';

class UpdatePersonalInfo extends Component {
    
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

        let dataToSubmit = generateData(this.state.formData, 'update_user');
        let formIsValid = ifFormValid(this.state.formData, 'update_user');
        
        if (formIsValid) {    
            this.props.dispatch(updateUserData(dataToSubmit))
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
    componentDidMount(){
        const newFormData = populateFields(this.state.formData,this.props.user.userData)

        this.setState({
            formdata: newFormData
        })
    }
    render() {
        return (
            <div className = "update_profile_info">
                <form onSubmit={(event => this.submitForm(event))}>
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

export default connect(mapStateToProps)(UpdatePersonalInfo);