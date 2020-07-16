import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Personnel from './Personnel';
import {SetLogOut} from '../../redux/AuthReducer'





class PersonnelComponent extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>

         return <Personnel SetLogOut={this.props.SetLogOut} name={this.props.name}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id
});

export default  connect (mapStateToProps,{SetLogOut}) (PersonnelComponent)
