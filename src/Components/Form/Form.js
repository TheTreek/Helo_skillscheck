import axios from 'axios';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Form.css'

class Form extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
        }
    }

    handleTitle = (val)=>{
        this.setState({
            title: val
        });
    }

    handleImg = (val)=>{
        this.setState({
            img: val
        });
    }

    handleContent = (val)=>{
        this.setState({
            content: val
        });
    }

    submitPost = (val)=>{
        const url='/api/post/';
        const body = {
            title: this.state.title,
            content: this.state.content,
            img: this.state.img
        }
        axios.post(url,body)
            .then(res=>{
                this.props.history.push('/dashboard');
            }).catch(err=>console.log(err));
    }

    render(){
        return(
            <div id='form-body'>
                <div id='form-container'>
                    <h1>New Post</h1>
                    <form>
                        Title:<input onChange={e=>this.handleTitle(e.target.value)} value={this.state.title} id='title-input'/>
                        Image URL: <input onChange={e=>this.handleImg(e.target.value)} value={this.state.img} id='img-input'/>
                        Content: <input onChange={e=>this.handleContent(e.target.value)} value={this.state.content} id='content-input'/>
                        <button onClick={this.submitPost}>Post</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Form);