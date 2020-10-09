import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Posts.css'

class Posts extends Component{
    render(){
        console.log(this.props);
        return(
                <div className='post'>
                    <Link to={`/post/${this.props.data.id}`} style={{ textDecoration:'none'}}><h1>{this.props.data.title}</h1></Link>
                    <span className='post-users'>
                        <span className='post-username'>by {this.props.data.username}</span>
                        <img className='post-profile-img' src={this.props.data.profile_pic}/>
                    </span>
                </div>
        );
    }
}

export default Posts;