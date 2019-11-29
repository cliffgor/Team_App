import React, { Component } from 'react';
import spinner from '../assets/images/loader.gif';


class Loader extends Component {
  render () {
      return (
      <div>
          <img src={spinner} style={{margin: '10em auto', display: 'block', width: '15em'}} alt='Loading' />
      </div>
      )
  }
}

export default Loader;