import React from 'react';
import UserNav from '../../components/UserNav/UserNav';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className='container'>
            <UserNav />
            <div className='profile-container'>
                <h2 className='header'>My Profile</h2>
                <div className='profile'>
                    <p className='info'>First Name</p>
                    <p className='info'>Last Name</p>
                </div>
                <div className='profile'>
                <p className='info'>Email</p>
                <p className='info'>Gender</p>
                </div>
                <div className='profile'>
                <p className='info'>Job Role</p>
                <p className='info'>Department</p>
                </div>
                <div>
                <p className='info address'>Address</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;