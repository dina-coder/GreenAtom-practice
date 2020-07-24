import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlanForm from './AdaptationPlanForm'
import {DeleteTaskFromEmployee,GetEmployeeProfileInfo, TakeTasks, UpdateTaskStatusFromEmployee, 
    UpdateTaskFromEmployee,CreatTaskForEmployee} from '../../redux/reducers/EmployeeReducer'
import {updatePlan,takePlans} from '../../redux/reducers/PlansReducer';
import {takeNames,takeSteps,takePositions,TakeGradesInfo} from '../../redux/reducers/DictReducer'
import Preloader from '../../Preloader/Preloader';

class AdaptationPlan extends React.Component
{
    componentDidMount(){
           this.loadInfo();
           this.props.TakeGradesInfo();
           this.props.takeSteps();
           this.props.takeNames(1);
           this.props.takeNames(2);
           this.props.takePositions();
        
    }


    componentDidUpdate(prevProps){
        if (prevProps.plantasks!=this.props.plantasks){
        this.setState({plantasks:this.props.plantasks})
        }
        if (prevProps.employee!=this.props.employee){
            this.setState({employee:this.props.employee})
            }
        }
     
    loadInfo = () => {
        return this.props.worker_id ?  
            this.props.GetEmployeeProfileInfo(this.props.worker_id) 
            : this.props.GetEmployeeProfileInfo(this.props.user_id); 
    }
    
   

    render() {
      
         return (<>
            {this.props.isFetching === true ? 
            <Preloader/>
            :
            <AdaptationPlanForm 
                takePlans = {this.props.takePlans}
                grades = {this.props.grades}
                stepList ={this.props.stepList}
                hrNames = {this.props.hrNames}
                positions = {this.props.positions}
                supersNames = {this.props.supersNames}
                setPlanClick = {this.props.setPlanClick}
                role_id = {this.props.role_id}
                user_id = {this.props.user_id}
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
                amountOfTask={this.props.amountOfTask}
            />
    }
            </>)


    }
}
const mapStateToProps=(state)=>({
    allPlans: state.PlansReducer.plansList,
    grades:state.DictReducer.grades,
    stepList: state.DictReducer.stepList,
    hrNames: state.DictReducer.hrNames,
    positions: state.DictReducer.positions,
    role_id:state.AuthReducer.role_id,
    isFetching:state.AuthReducer.isFetching,
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks,
    workersNames : state.DictReducer.workersNames,
    supersNames : state.DictReducer.supersNames,
    amountOfTask: state.EmployeeReducer.amountOfTask
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo,DeleteTaskFromEmployee, 
    TakeTasks, UpdateTaskStatusFromEmployee,CreatTaskForEmployee, UpdateTaskFromEmployee, 
    updatePlan,takeNames,takeSteps,takePositions,TakeGradesInfo,takePlans}) (AdaptationPlan)
