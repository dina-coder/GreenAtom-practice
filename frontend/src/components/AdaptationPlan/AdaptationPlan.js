import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlanForm from './AdaptationPlanForm'
import {GetEmployeeProfileInfo} from '../../redux/reducers/EmployeeReducer'

class AdaptationPlan extends React.Component
{
    componentDidMount(){
       this.props.GetEmployeeProfileInfo(this.props.user_id) 
    }
<<<<<<< HEAD
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/login'}/>
        console.log(this.props.employee)
         return <AdaptationPlanForm name={this.props.name} employee={this.props.employee} plantasks={this.props.plantasks} date_creation={this.props.date_creation}/>
       
=======

    render() {
         return (
            <AdaptationPlanForm 
                name={this.props.name} 
                employee={this.props.employee}
                plantasks={this.props.plantasks} 
                date_creation={this.props.date_creation}
            />)
>>>>>>> 9bec79bd6973997d704b710e99970526144fc097
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,

    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo}) (AdaptationPlan)
