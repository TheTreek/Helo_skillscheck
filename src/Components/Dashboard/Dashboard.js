import React, {Component} from 'react';
import './Dashboard.css';
import { connect } from 'react-redux';
import Posts from '../Posts/Posts';
import axios from 'axios';

class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            myPosts: true,
            search: '',
            posts: []
        }
    }

    handleCheck = async ()=>{
        await this.setState({
            myPosts: !this.state.myPosts
        });
        this.getPosts();
    }

    handleSearch = (val)=>{
        this.setState({
            search: val
        });
    }

    componentDidMount(){
        this.getPosts();
    }

    getPosts(){
        let url = '/api/posts?'
        if(!this.state.myPosts)
            url += `username=${this.props.username}`;
        if(this.state.search)
            url+= `search=${this.state.search}`;
        axios.get(url)
            .then(res=>{
                this.setState({
                    posts: res.data
                });
            }).catch(err=>console.log(err));
    }

    searchSubmit = ()=>{
        this.getPosts();
    }

    resetSearch = async() =>{
        await this.setState({
            search: ''
        });
        this.getPosts();
    }

    render(){
        let checkbox = <input type='checkbox' onClick={this.handleCheck} value={this.state.myPosts} />
        if(this.state.myPosts){
            checkbox = <input type='checkbox' onClick={this.handleCheck} value={this.state.myPosts} defaultChecked/>
        }

        const posts = this.state.posts.map((val,i)=>{
            return <Posts key={i} data={val}/>
        })
        return(
            <div id='dashboard-body'>
                <div id='dashboard-search'>
                    <span id='input-container'>
                        <input onChange={e=>this.handleSearch(e.target.value)} value={this.state.search} id='post-search' placeholder='Search by title...'/>
                        <button onClick={this.searchSubmit} id='search-btn'>Search</button>
                        <button onClick={this.resetSearch} id='reset-btn'>Reset</button>
                    </span>
                    <span id='check'>
                        My Posts {checkbox}
                    </span>
                </div>

                <div id='dashboard-posts'>
                    {posts}
                </div>
            </div>
        );
    }   
}

const mapStateToProps = reduxState => reduxState;
export default connect(mapStateToProps)(Dashboard);