import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';

class Nav extends Component{
    
    render(){
        if(this.props.location.pathname === '/'){
            return null;
        }
        // }else if(!this.props.username){
        //     this.props.history.push('/');
        //     return null;
        // }
        return(
            <nav id='nav'>
                <span id='nav-profile'>
                        <img id='nav-img' src={this.props.profile_pic} alt={this.props.username}/>
                        <span id='nav-username'>{this.props.username}</span>
                    </span>
                <span id='nav-middle'>
                    <Link to='/dashboard' id='home-btn' className='nav-links'>Home</Link>
                    <Link to='/new' id='post-btn' className='nav-links'>New Post</Link>
                </span>
                <Link to='/' id='logout-btn' className='nav-links'>Logout</Link>
            </nav>
        );
    }
}

const mapStateToProps = reduxState => reduxState;
export default withRouter(connect(mapStateToProps)(Nav));