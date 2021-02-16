import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalInfo from './update_personal_info';
import UpdatePassword from './updatePassword';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalInfo/>
            <h1>Password</h1>
            <UpdatePassword />
        </UserLayout>
    );
};

export default UpdateProfile;