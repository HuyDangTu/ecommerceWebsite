import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormField from '../ultils/Form/FormField';
import { update, generateData, ifFormValid }  from '../ultils/Form/FormActions';
import {loginUser } from '../../actions/user_action'
import  {withRouter} from 'react-router-dom';
import MyButton from '../ultils/button'

class Login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '', 
            },
            password: {
                element: 'password',
                value: '',
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
            }
        }
    }
    //Hàm này truyền vào props change của formfield để khi có thay đổi trên Formfield
    //thì gọi đến callback Funciton này xử lý các thay đổi và cập nhật lại state -> reRender lại component
    updateForm = (element) => { 
        //Hàm update được viết trong FormActions.js
        const newFormdata = update(element,this.state.formData,'login');
        //Cập nhật lại State
        this.setState({
            formError: false,
            formData: newFormdata
        });
    }
    submitForm = (event) => { 
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formData,'login');
        
        let formIsValid = ifFormValid(this.state.formData, 'login');
        
        if (formIsValid){
            this.props.dispatch(loginUser(dataToSubmit)).then(response =>{
                if(response.payload.loginSuccess){
                    console.log(response.payload);
                    this.props.history.push('/users/transaction')
                }else{
                    this.setState({
                        formError: false
                    });
                }
            });
        }
        else{
            this.setState({
                formError: true
            })

        }
    }

    render() {
        return (
            <div className="signin">
                <div className='signin__container'>
                <form className='signin__form' onSubmit={(event)=>this.submitForm(event)}>
                {/* Component Formfild trả lại các thành phần của form 
                    như text, checkBox, button,... dựa vào prop id 
                        Component Formfield nhận vào 3 props:
                        - id: id của trường này
                        - formData: dữ liệu cho field, sử dụng những dữ liệu trong formData này để xử lý các sự kiện thay đổi trên field, gồm có:
                                    element: là element ( thẻ input, checkBox, button, .....)
                                    value: giá trị của element '',
                                    config: là 1 object là các props của Thẻ ví dụ 
                                        {
                                            name: 'email_input',
                                            type: 'email',
                                            placeholder: 'Enter your email'
                                        },
                                    validation: là 1 Obj chứa các kiểu xác thực là key, 
                                                nếu value là true thì field này phải đc xác thực theo kiểu đó, ví dụ: 
                                                {
                                                    required: true,
                                                    email: true
                                                },
                                    valid: Xác thực hay không ( false/ true)
                                    touched: Có đc touch hay không (false/true) 
                                    validationMessage: Lưu message sau khi xác thực ('thành công'/'thất bại'),
                        -change: callBackfunction dùng để xử lý sự kiện thay đổi trên field */}
                    <div className="signin__tittle">Sign in</div>
                    {/* <div className ='signin__method'> 
                        <img src={require('../../asset/login-page/facebook.png')}/>
                        <img src={require('../../asset/login-page/google.png')}/>
                        <img src={require('../../asset/login-page/twitter.png')}/>
                    </div> */}
                    <FormField 
                        id={'email'}
                        formData={this.state.formData.email}
                        //Hàm change nhận vào một element và gọi đến hàm updateForm(element) 
                        change={(element) => this.updateForm(element)}
                    />
                   
                    <FormField
                        id={'password'}
                        formData={this.state.formData.password}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ?
                        <div className="errorLabel">
                            PLease check yoour data!
                        </div>
                        : ''}
                    <div className='forgot__password'>
                        <MyButton
                            type="default"
                            title="forgot your password?"
                            linkTo="/register"
                        />
                    </div>
                    <button className='signin__button' onClick={(event) => { this.submitForm(event)}}>Login</button>
                    <div className='SignUp__Link'>
                        <MyButton
                            type="default"
                            title="Don't have account?Sign up"
                            linkTo="/register"
                        />
                    </div>
                </form>
                </div>
            </div>
        );
    }
}
//HOC connect và withRouter 
//gắn vào component Login các props dispatch, getStored, history,....
export default connect()(withRouter(Login));