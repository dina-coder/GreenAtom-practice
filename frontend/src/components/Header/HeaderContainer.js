import React from 'react';
import {connect} from 'react-redux'
import {SetLogOut} from '../../redux/AuthReducer'
import Header from './Header';
import { Redirect } from 'react-router-dom';






class HeaderContainer extends React.Component
{
    
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>
         return <Header name={this.props.name}
                SetLogOut={this.props.SetLogOut}
                role={this.props.role}
                isAuth={this.props.isAuth}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id
});

export default  connect (mapStateToProps,{SetLogOut}) (HeaderContainer);

