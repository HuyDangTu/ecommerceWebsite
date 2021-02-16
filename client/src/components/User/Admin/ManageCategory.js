import React, { Component } from 'react';
import Layout from '../../../hoc/layout';
import ManageBrands from './ManageBrands';
import ManageWoods from './ManageWoods';
import UserLayout from '../../../hoc/user';
class ManageCategory extends Component {
    render() {
        return (
            <UserLayout>
                <ManageBrands/>
                <ManageWoods/>
            </UserLayout>
        );
    }
}

export default ManageCategory;