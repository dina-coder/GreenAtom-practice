import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Profile from './Profile';




class ContentContainer extends React.Component
{
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/login'}/>
        return <Profile/>
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth
});

export default  connect (mapStateToProps) (ContentContainer)
