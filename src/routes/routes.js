import React , { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications'; 
import 'react-notifications/lib/notifications.css';
import LandingPage from '../Containers/LandingPage/LandingPage';
import Signup from '../Containers/Signup/Signup';
import Signin from '../Containers/Signin/Signin';
import CreateArticle from '../Containers/CreateArticle/CreateArticle';
import GifUpload from '../Containers/GifUpload/GifUpload';
import MyFeeds from '../Containers/MyFeeds/MyFeeds';
// import ProfilePage from '../Containers/ProfilePage/ProfilePage';
import Timeline from '../Containers/Timeline/Timeline';
import NotFound from '../components/NotFound/NotFound';

class Routes extends Component {
    render () {
        return(
            <Router>
            <div>
            <Switch>
             <Route exact path='/' component={LandingPage} />
             <Route path='/register' component={Signup} />
             <Route path='/login' component={Signin} />
             <Route path='/article' component={CreateArticle} />
             <Route path='/gif' component={GifUpload} />
             <Route path='/posts' component={MyFeeds} />
             {/* <Route path='/profile' component={ProfilePage} /> */}
             <Route path='/feeds' component={Timeline} />
             <Route component={NotFound} />
             </Switch>
             <NotificationContainer />
            </div>
            </Router>
        );
    }
}

export default Routes;