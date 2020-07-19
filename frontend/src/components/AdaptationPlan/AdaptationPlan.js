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


=======
>>>>>>> 64ff9af717648e685ff8e5b2a10bdbd8d3643bad

    render() {
         return (
            <AdaptationPlanForm 
                name={this.props.name} 
                employee={this.props.employee}
                plantasks={this.props.plantasks} 
            />)
<<<<<<< HEAD

=======
>>>>>>> 64ff9af717648e685ff8e5b2a10bdbd8d3643bad
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
