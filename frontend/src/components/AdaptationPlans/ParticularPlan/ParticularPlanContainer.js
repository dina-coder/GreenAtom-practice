import React from 'react';
import {connect} from 'react-redux'
import ParticularPlan from './ParticularPlan';
import {DeleteTaskFromEmployee,GetEmployeeProfileInfo, TakeTasks, UpdateTaskStatusFromEmployee, 
    UpdateTaskFromEmployee,CreatTaskForEmployee} from '../../../redux/reducers/EmployeeReducer'

class ParticularPlanContainer extends React.Component
{
    componentDidMount(){
            this.props.GetEmployeeProfileInfo(this.props.user_id_for_superhr) 
    }

    componentDidUpdate(prevProps){
        if (prevProps.plantasks!=this.props.plantasks){
        this.setState({plantasks:this.props.plantasks})
        }
        }

    render() {
         return (
            <ParticularPlan CreatTaskForEmployee = {this.props.CreatTaskForEmployee}
            name={this.props.name} 
            setPlanClick = {this.props.setPlanClick}
            employee={this.props.employee}
            plantasks={this.props.plantasks} 
            DeleteTaskFromEmployee={this.props.DeleteTaskFromEmployee} 
            TakeTasks={this.props.TakeTasks}
            UpdateTaskStatusFromEmployee={this.props.UpdateTaskStatusFromEmployee}
            UpdateTaskFromEmployee={this.props.UpdateTaskFromEmployee}/>
            )

    }
}
const mapStateToProps=(state)=>({
    user_id_for_superhr:state.EmployeeReducer.user_id_for_superhr,
    name:state.AuthReducer.name,
    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo,DeleteTaskFromEmployee, 
    TakeTasks, UpdateTaskStatusFromEmployee,CreatTaskForEmployee, UpdateTaskFromEmployee}) (ParticularPlanContainer)
