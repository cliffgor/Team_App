import React, { Component } from 'react';
import Routes from './routes/routes';
// import ViewGif from './Containers/ViewGif/ViewGif';
import Loader from './components/Loader';
class App extends Component {
  render () {
    return (
      <Routes />
      // <ViewGif />
      // <Loader />
    );
  }
}

export default App;
