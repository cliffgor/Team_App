import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserNav from '../../components/UserNav/UserNav';
import './Timeline.css';

// loader
import Loader from '../../components/Loader';

const baseUrl = 'https://team-work-api.herokuapp.com/api/v1';


class Timeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            articleFeeds: [],
            gifFeeds: [],
            token: ''
        }
    }




    componentDidMount() {
        const token = localStorage.getItem('token')
        // this.setState({
        //     token: token
        //   })
       
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
                    articleFeeds: data.data.articles,
                    gifFeeds: data.data.gifs
                })

            })
            .catch(e => console.log(e));

            // if (!token) {
            //     window.location = 'http://localhost:3000/login';
            // }
    }

    

    render() {
        const { articleFeeds, gifFeeds, loading } = this.state;

        return (
            <div className='container'>
                <UserNav />
                <div className='right'>
                    <div className='headers'>
                        <h4>Articles</h4> | <h4>Gifs</h4>
                    </div>
                    <div className='article-container'>

                        {articleFeeds === null || loading ? (
                            <Loader />) : (
                                articleFeeds.map((articles, i) => {
                                    return (
                                        <div className='articles' key={i}>
                                            <div className='article-properties'>
                                                <Link to='/'><h3 className='article-title'>{articles.title}</h3></Link>
                                                <p>{articles.createdon}</p>
                                            </div>
                                            <article>
                                                {articles.article
                                                }
                                                {/* .length > 200 ?
                                            `${articles.article.substr(0, 200)}...`
                                        } */}
                                            </article>
                                        </div>
                                    )
                                })
                            )
                        }

                    </div>
                    {/* gif area */}
                    <div className='gif-container'>
                        {gifFeeds.map((gifs, i) => {
                            return (

                                <div className='gifs' key={i}>
                                    <img src={gifs.image} alt='gif' className='gif-image' />
                                    <div className='gif-properties'>
                                        <h3>{gifs.giftitle}</h3>
                                        <div>{gifs.gifcreatedon}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default Timeline;