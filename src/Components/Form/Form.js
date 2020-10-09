import React, {Component} from 'react';
import './Form.css'

class Form extends Component{
    render(){
        return(
            <div id='form-body'>
                <div id='form-container'>
                    <h1>New Post</h1>
                    <form>
                        Title:<input id='title-input'/>
                        Image URL: <input id='img-input'/>
                        Content: <input id='content-input'/>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Form;