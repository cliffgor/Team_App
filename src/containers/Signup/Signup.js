import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import './Signup.css';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            bodyValue: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: '',
                jobRole: '',
                department: '',
                address: ''
            }
        }
    }


    formInput = (e) => {
        let bodyValue = { ...this.state.bodyValue };
        bodyValue[e.target.name] = e.target.value;


        this.setState({
            bodyValue: bodyValue
        })
    }

    handleFormSubmit = async () => {
        const response = await fetch('https://team-work-api.herokuapp.com/api/v1/auth/create-user', {
            method: 'POST',
            body: JSON.stringify({ ...this.state.bodyValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(e => {
                // return console.log('hello')
                console.log(e)
            })

        // notifications
        if(!response) {
            return NotificationManager.error('check your internet connection', 'Connection error!', 3000);
        }
        if (response.error === 'user already exist') {
            return NotificationManager.error('user already exist', 'User exists!', 3000);
        }
        else if(response.error === 'all fields are required') {
            return NotificationManager.error('all fields are required', 'Input error!', 3000);
        }
        else if(response.error === 'gender input length should be more than three characters') {
            return NotificationManager.error('gender type should be more than three characters', 'Input error!', 3000);
        }
        else if(response.error === 'password length should be more than six characters') {
            return NotificationManager.error('password length should be more than six characters', 'Input error!', 3000);
        }
        else if(response.error === 'invalid email format') {
            return NotificationManager.error('invalid email format', 'Input error!', 3000);
        }
        else {
            this.setState({
                loading: true
            })
            NotificationManager.success('sign up successfull', 'Successful!', 3000);
            this.props.history.push('/feeds')
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.authorId);



    }



    render() {
        const { loading } = this.state;
        return (
            <div>
                <Navbar />
                <div className='form-container'>
                    <h2 className='reg'>Register for free</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.handleFormSubmit();
                        console.log(this.state.bodyValue)
                    }}>
                        <div>
                            <input type='text' name='firstName' placeholder='First name' onChange={this.formInput} />
                            <input type='text' name='lastName' placeholder='Last name' onChange={this.formInput} />
                        </div>
                        <div>
                            <input type='email' name='email' placeholder='User@mail.com' onChange={this.formInput} />
                            <input type='password' name='password' placeholder='******' onChange={this.formInput} />
                        </div>
                        <input type='text' name='gender' placeholder='Gender' className='info' onChange={this.formInput} /><br />
                        <input type='text' name='jobRole' placeholder='Jobrole' className='info' onChange={this.formInput} /><br />
                        <input type='text' name='department' placeholder='Department' className='info' onChange={this.formInput} /><br />
                        <input type='text' name='address' placeholder='Address' className='info' onChange={this.formInput} /><br />
                        {loading ? (<button className='btn-reg'>loading ...</button>) : (<button className='btn-reg'>Register</button>)}
                    </form>
                    <p>Already have an accout? please <Link to='/login'>login</Link></p>
                </div>
                <Footer />
            </div>   
        );
    }
};

export default Signup;
