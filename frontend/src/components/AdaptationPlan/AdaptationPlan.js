import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlanForm from './AdaptationPlanForm'
import {DeleteTaskFromEmployee,GetEmployeeProfileInfo, TakeTasks, UpdateTaskStatusFromEmployee, 
    UpdateTaskFromEmployee,CreatTaskForEmployee,GetTaskAmount, GetComments, PostComment, 
    GetCommentsAmount} from '../../redux/reducers/EmployeeReducer'
import {updatePlan,getFilteredList} from '../../redux/reducers/PlansReducer';
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

     
    loadInfo = () => {
        return this.props.worker_id ?  
            this.props.GetEmployeeProfileInfo(this.props.worker_id) 
            : this.props.GetEmployeeProfileInfo(this.props.user_id); 
    }
    
   

    render() {
        
         return (<>
             {
            <AdaptationPlanForm 
                GetTaskAmount = {this.props.GetTaskAmount}
                takePlans = {this.props.getFilteredList}
                grades = {this.props.grades}
                stepList ={this.props.stepList}
                hrNames = {this.props.hrNames}
                positions = {this.props.positions}
                supersNames = {this.props.supersNames}
                setPlanClick = {this.props.setPlanClick}
                role_id = {this.props.role_id}
                user_id = {this.props.user_id}
                isFetching={this.props.isFetching}
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
                amountOfComments={this.props.amountOfComments}
                comments={this.props.comments}
                PostComment={this.props.PostComment}
                GetComments={this.props.GetComments}
                filters={this.props.filters}
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
    amountOfTask: state.EmployeeReducer.amountOfTask,
    comments: state.EmployeeReducer.comments,
    amountOfComments: state.EmployeeReducer.amountOfComments,
    filters: state.PlansReducer.filters
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo,DeleteTaskFromEmployee, 
    TakeTasks, UpdateTaskStatusFromEmployee,CreatTaskForEmployee, UpdateTaskFromEmployee, 
    updatePlan,takeNames,takeSteps,takePositions,TakeGradesInfo,getFilteredList,GetTaskAmount,
     GetComments, PostComment, GetCommentsAmount}) (AdaptationPlan)
