import React from 'react';
import {connect} from 'react-redux'
import AdaptationPlanForm from './AdaptationPlanForm'
import {DeleteTaskFromEmployee,GetEmployeeProfileInfo, TakeTasks, UpdateTaskStatusFromEmployee} from '../../redux/reducers/EmployeeReducer'
import Preloader from '../../Preloader/Preloader';

class AdaptationPlan extends React.Component
{
    componentDidMount(){
       this.props.GetEmployeeProfileInfo(this.props.user_id) 
        console.log(this.props.plantasks)
    }


    componentDidUpdate(prevProps){
        if (prevProps.plantasks!=this.props.plantasks){
        this.setState({plantasks:this.props.plantasks})
        }
        }
        

    render() {
      
         return (<>
            {this.props.isFetching === true ? 
            <Preloader/>
            :
            <AdaptationPlanForm 
                name={this.props.name} 
                employee={this.props.employee}
                plantasks={this.props.plantasks} 
                DeleteTaskFromEmployee={this.props.DeleteTaskFromEmployee} 
                TakeTasks={this.props.TakeTasks}
                UpdateTaskStatusFromEmployee={this.props.UpdateTaskStatusFromEmployee}
            />
    }
            </>)


    }
}
const mapStateToProps=(state)=>({
    isFetching:state.AuthReducer.isFetching,
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
    employee:state.EmployeeReducer.employee_info,
    plantasks:state.EmployeeReducer.plantasks
});

export default  connect (mapStateToProps,{GetEmployeeProfileInfo,DeleteTaskFromEmployee, TakeTasks, UpdateTaskStatusFromEmployee}) (AdaptationPlan)
