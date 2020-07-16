import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Employee from './Employee'





class EmployeeComponent extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>

         return <Employee name={this.props.name}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id
});

export default  connect (mapStateToProps) (EmployeeComponent)
