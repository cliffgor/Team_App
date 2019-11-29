import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return(
        <main className='error-page'>
              <p className='back-link'>
              <Link to='/' >Go back to home page</Link>
              </p>
        </main>
    );
};

export default NotFound;