import axios from 'axios';
import React, {Component} from 'react';
import './Post.css';

class Post extends Component{
    constructor(){
        super();
        this.state = {
            data: {}
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.postid);
        axios.get(`/api/post/${this.props.match.params.postid}`)
            .then(res=>{
                this.setState({
                    data: res.data
                });
            }).catch(err=>console.log(err));
    }
    render(){
        console.log(this.state.data);
        return(
            <div id='post-container'>
                <div id='post-body'>
                    <span id='post-header'>
                        <h1>{this.state.data.title}</h1>
                        <span>
                            <span>by {this.state.data.username}</span>
                            <img className='post-profile-pic' src={this.state.data.profile_pic}/>
                        </span>
                    </span>

                    <span id='content-container'>
                        <img src={this.state.data.img} alt={this.state.data.title}/>
                        <span>{this.state.data.content}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default Post;