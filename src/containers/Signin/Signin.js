import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Signin.css';

class Signin extends Component {
    constructor () {
        super();
    this.state = {
        bodyValue: {
           email: '',
           password: ''
        }
    }
   }


   formInput = (e) => {
       let fieldData = {...this.state.bodyValue};
       fieldData[e.target.name] = e.target.value;

       this.setState({
          bodyValue: fieldData
       })
   }

   handleFormSubmit = async () => {
       const response = await fetch('https://team-work-api.herokuapp.com/api/v1/auth/signin', {
           method: 'POST',
           body: JSON.stringify({...this.state.bodyValue}),
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then(res => res.json())
       .catch(e => console.log(e));

       // notifications
       if(!response) {
           return NotificationManager.error('check your connection', 'Connection error!', 3000);
       }
       if(response.error === 'email does not exist, please sign up'){
        return NotificationManager.error('user does not exist, please sign up', 'Error!', 3000);
       }
       else if(response.error === 'all fields are required') {
        return NotificationManager.error('all fields are required', 'Input error!', 3000);
       }
       else{
        NotificationManager.success('log in successful', 'Successful!', 3000);
        this.props.history.push('/feeds')
       }

       localStorage.setItem('token', response.data.token);
       localStorage.setItem('id', response.data.authorId);
   }

   render () {
    return (
        <div>
         <Navbar />
         <div className='signin-form-container'>
         <h2 className='reg'>Welcome back</h2>
            <form onSubmit={(e)=> {
                e.preventDefault();
                this.handleFormSubmit();
            }}>
                <input type='email' placeholder='User@mail.com' name='email' className='details' onChange={this.formInput} /><br />
                <input type='password' placeholder='******' name='password' className='details' onChange={this.formInput} /><br />
                <button className='btn-reg'>Log in</button>
            </form>
            <p>You don't have an accout? please <Link to='/register'>Signup</Link></p> 
         </div>
         <Footer />
        </div>
    );
   }
};

export default Signin;