import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import UserNav from '../../components/UserNav/UserNav';
import './MyFeeds.css';

// loader
import Loader from '../../components/Loader';
const baseUrl = 'https://team-work-api.herokuapp.com/api/v1';

class MyFeeds extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            myFeeds: [],
            myGifs : [],
            token: ''
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token')

        if(!token) {
            window.location = 'http://localhost:3000/login';
          }

        fetch(`${baseUrl}/feed`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    loading: false,
                    myFeeds: data.data.articles,
                    myGifs: data.data.gifs,
                    token: token
                })
                console.log(this.state.myFeeds)
                
            })
            .catch(e => {
                console.log(e)
                return NotificationManager.error('check your connection', 'Connection error!', 3000);
        });
    }


    // delete article
    handleArticleDelete = (id) => {
       fetch(`${baseUrl}/articles/${id}`, {
          method: 'DELETE',
          headers: {
              'authorization': `bearer ${this.state.token}`,
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.status === 'success') {
            NotificationManager.success('Article deleted successfully', 'Successful!', 5000); 
            window.location = 'http://localhost:3000/posts';
        }
      })
      .catch(e => {
        console.log(e)
        return NotificationManager.error('check your connection', 'Connection error!', 3000);
      });

    }


    // delete gif
    handleGifDelete = (id) => {
        fetch(`${baseUrl}/gifs/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${this.state.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status === 'success') {
                NotificationManager.success('Gif deleted successfully', 'Successful!', 5000); 
                window.location = 'http://localhost:3000/posts';
            }
        })
        .catch(e => {
            console.log(e)
            return NotificationManager.error('check your connection', 'Connection error!', 3000);
        });
        
      }



    render() {
        const { myFeeds, myGifs, loading } = this.state;

        const id = parseInt(localStorage.getItem('id'))

        return (
            <div className='container' >
                <UserNav />
                <div className='right'>
                    <div className='headers'>
                        <h4>Articles</h4> | <h4>Gifs</h4>
                    </div>
                    <div className='article-container'>
                        {loading ? <Loader /> : myFeeds === null ? <h1>There are no feeds</h1> :
                        myFeeds.map((articles, i) => {
                            if (articles.authorid === id) {
                                return (
                                    <div className='articles' key={i}>
                                        <div className='article-properties'>
                                            <Link to='/'><h3>{articles.title}</h3></Link>
                                            <p>{articles.createdon}</p>
                                        </div>
                                        <article>
                                            {articles.article}
                                        </article>
                                        <div className='options'>
                                            <button className='btn update'>Edit</button>
                                            <button className='btn delete' onClick={(e)=> {
                                                e.preventDefault();
                                                this.handleArticleDelete(articles.articleid);
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {/* gif area */}
                    <div className='gif-container'>
                        {myGifs.map((gifs, i) => {
                            if (gifs.gifauthorid === id) {
                                // if (gifs.length === 0) {
                                //     return (
                                //         <h1>NO gif available</h1>
                                //     )
                                // }
                            
                                    return (
                                        <div className='gifs' key={i}>
                                            <img src={gifs.image} alt='gif' className='gif-image' />
                                            <div className='gif-properties'>
                                                <h3>{gifs.giftitle}</h3>
                                                <div>{gifs.gifcreatedon}</div>
                                            </div>
                                            <div className='option'>
                                                <button className='btn delete' onClick={(e) => {
                                                    e.preventDefault();
                                                    this.handleGifDelete(gifs.gifid);
                                                }}>Delete</button>
                                            </div>
                                        </div>
                                    );

                            }
                        })}

                    </div>
                </div>
            </div>
        );
    }
};



export default MyFeeds;