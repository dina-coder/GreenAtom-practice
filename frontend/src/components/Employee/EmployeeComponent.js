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
        console.log(this.props.employee)
         return <Employee name={this.props.name} employee={this.props.employee}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
    employee:state.AuthReducer.employee_info
});

export default  connect (mapStateToProps) (EmployeeComponent)
