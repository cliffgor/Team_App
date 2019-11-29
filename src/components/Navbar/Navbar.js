import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
    render () {
        return (
            <header>
                <nav className='main-nav'>
                    <Link to='/' className='app-name'>Team App</Link>
                    <ul className='sub-nav'>
                        <li><NavLink activeClassName='active' to='/register'>Register</NavLink></li>
                        <li><NavLink activeClassName='active' to='login'>Login</NavLink></li>
                    </ul>
                </nav>
            </header>
        );
    }
    
}

export default Navbar;