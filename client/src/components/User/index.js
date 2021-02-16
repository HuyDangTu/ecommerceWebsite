import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/user';
import MyButton from '../ultils/button'
import UserHistoryBlock from '../ultils/User/history_block';
import './history_purchased.scss';

class UserDashboard extends Component {

    render(){
        return (
            <UserLayout>
                <div className="dashboard">
                    {
                    this.props.user.userData.history ?
                        <div>
                            <h2 className="title">History purchased</h2>
                            <div className="links" >
                                <UserHistoryBlock
                                    products={this.props.user.userData.history}
                                />
                            </div>
                        </div>
                    : null
                    }
                </div>
            </UserLayout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserDashboard);