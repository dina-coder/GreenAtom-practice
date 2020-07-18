import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AdaptationPlanForm from './AdaptationPlanForm'
import {GetEmployeeProfileInfo} from '../../redux/reducers/EmployeeReducer'





class AdaptationPlan extends React.Component
{
    componentDidMount(){
   
       this.props.GetEmployeeProfileInfo(this.props.user_id)
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>
        console.log(this.props.employee)
         return <AdaptationPlanForm name={this.props.name} employee={this.props.employee} plantasks={this.props.plantasks} date_creation={this.props.date_creation}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
<<<<<<< HEAD
    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
=======
    employee:state.AuthReducer.employee_info,
    plantasks:state.AuthReducer.plantasks,
    date_creation: state.AuthReducer.date_creation
>>>>>>> ecd2ea15ac748f0064cb1a643f1dde2df369142b
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo}) (AdaptationPlan)
