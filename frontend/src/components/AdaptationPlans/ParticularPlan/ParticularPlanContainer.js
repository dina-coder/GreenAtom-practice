import React from 'react';
import {connect} from 'react-redux'
import ParticularPlan from './ParticularPlan';
import {GetEmployeeProfileInfo} from '../../../redux/reducers/EmployeeReducer'

class ParticularPlanContainer extends React.Component
{
    componentDidMount(){
            this.props.GetEmployeeProfileInfo(this.props.user_id_for_superhr) 
    }

    render() {
         return (
            <ParticularPlan employee = {this.props.employee_info}
                            plantasks = {this.props.plantasks}/>
            )

    }
}
const mapStateToProps=(state)=>({
    user_id_for_superhr:state.EmployeeReducer.user_id_for_superhr,
    employee_info:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo}) (ParticularPlanContainer)
