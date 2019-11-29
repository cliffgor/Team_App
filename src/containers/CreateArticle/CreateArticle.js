import React, {Component} from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';


import UserNav from '../../components/UserNav/UserNav';

import './CreateArticle.css';

class ArticlePage extends Component {
    constructor () {
        super();
        this.state = {
            bodyValue: {
                title: '',
                article: ''
            }
        }
    }

    formInput = (e) => {
       let fieldData = {...this.state.bodyValue};
       fieldData[e.target.name] = e.target.value;

       this.setState({
           bodyValue: fieldData
       })

       console.log(fieldData)
    }

    render () {
        return (
            <div className='container'>
                <UserNav />
                <div className='write-article'>
                    <h1 className='header'>Write Your Article</h1>
                    <form>
                    <input type='text' placeholder='Article Title' name='title' className='title' onChange={this.formInput} />
                    <div className='textarea'>
                    <FroalaEditor name='article' model={this.state.content} onModelChanhe={this.handleModelChange} />
                    </div>
                <button className='btn-upload'>Publish</button>
                </form>
                </div>
                
            </div>
        );
    }
};

export default ArticlePage;