import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlanForm from './AdaptationPlanForm'
import {DeleteTaskFromEmployee,GetEmployeeProfileInfo, TakeTasks, UpdateTaskStatusFromEmployee, 
    UpdateTaskFromEmployee,CreatTaskForEmployee} from '../../redux/reducers/EmployeeReducer'
import {updatePlan} from '../../redux/reducers/PlansReducer'
import Preloader from '../../Preloader/Preloader';

class AdaptationPlan extends React.Component
{
    componentDidMount(){
        console.log(this.props.worker_id)
        this.props.worker_id ?  this.props.GetEmployeeProfileInfo(this.props.worker_id) :
       this.props.GetEmployeeProfileInfo(this.props.user_id) 
    }


    componentDidUpdate(prevProps){
        if (prevProps.plantasks!=this.props.plantasks){
        this.setState({plantasks:this.props.plantasks})
        }
        if (prevProps.employee!=this.props.employee){
            this.setState({employee:this.props.employee})
            }
        }
        

    render() {
      
         return (<>
            {this.props.isFetching === true ? 
            <Preloader/>
            :
            <AdaptationPlanForm 
                setPlanClick = {this.props.setPlanClick}
                role_id = {this.props.role_id}
                CreatTaskForEmployee = {this.props.CreatTaskForEmployee}
                name={this.props.name} 
                employee={this.props.employee}
                plantasks={this.props.plantasks} 
                DeleteTaskFromEmployee={this.props.DeleteTaskFromEmployee} 
                TakeTasks={this.props.TakeTasks}
                UpdateTaskStatusFromEmployee={this.props.UpdateTaskStatusFromEmployee}
                UpdateTaskFromEmployee={this.props.UpdateTaskFromEmployee}
                updatePlan={this.props.updatePlan}
                GetEmployeeProfileInfo={this.props.GetEmployeeProfileInfo}
            />
    }
            </>)


    }
}
const mapStateToProps=(state)=>({
    role_id:state.AuthReducer.role_id,
    isFetching:state.AuthReducer.isFetching,
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo,DeleteTaskFromEmployee, 
    TakeTasks, UpdateTaskStatusFromEmployee,CreatTaskForEmployee, UpdateTaskFromEmployee, 
    updatePlan}) (AdaptationPlan)
