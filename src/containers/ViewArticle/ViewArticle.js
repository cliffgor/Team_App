import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './ViewArticle.css';


const baseUrl = 'https://team-work-api.herokuapp.com/api/v1';

class ViewArticle extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            comment: '',
            token: ''
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('token')
        this.setState({
            token: token
        })
        fetch(`${baseUrl}/articles/1`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    comments: data.data.comment
                })
                console.log(data.data.comment)
            })
            .catch(e => {
                console.log(e)
                return console.log('hello')
            });
    }

    handleComment = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        this.setState({
            comment: e.target.value
        })
        console.log(this.state.comment)
    }

    handleCommentPost = () => {
        const authorId = parseInt(localStorage.getItem('id'));
        const { comment } = this.state;
        const data = { comment, authorId }

        fetch(`${baseUrl}/articles/1/comment`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'authorization': `bearer ${this.state.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
        
        // 
        // window.location = 'http://localhost:3000/posts';
      }


    render() {
        const { comments } = this.state;
        return (
            <div className='view-container'>
                <div className='article'>
                    {/* <Link to='/feeds'>Back to feeds</Link> */}
                    <h2>Article Title</h2>
                    <article></article>
                </div>
                <hr />
                <div className='comment-section'>
                    <div>
                        <form className='comment-form'>
                            <input placeholder='Comment' className='comment-field' onChange={(e) => this.handleComment(e)} /><br />
                            <button className='btn-comment' onClick={(e) => {
                                e.preventDefault()
                                this.handleCommentPost()
                                }}>Comment</button>
                        </form>
                    </div>
                    <div >
                        {comments.map((comment, i) => {
                            return (
                                <div className='comments' key={i}>
                                    {/* <div className='article-properties'>
                                <p>time</p>
                            </div> */}
                                    <article>{comment.comment}</article>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>
        );
    };
};

export default ViewArticle;