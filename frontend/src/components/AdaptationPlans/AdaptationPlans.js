import React from 'react';
import { connect } from 'react-redux';
import { takePlans, takeSteps } from '../../redux/reducers/PlansReducer';
import AdaptationPlansForm from './AdaptationPlansForm';
import {SetInfoForPlan} from '../../redux/reducers/EmployeeReducer'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles';

class AdaptationPlans extends React.Component {


    componentDidMount(){
        this.props.takePlans(this.props.role, this.props.user_id)
        this.props.takeSteps();
        console.log("steps:"+this.props.steps,this.props.allPlans)
    }
     
    render() {
        const privilegeToAdd = (role) => {
            return role === Roles.HR ? true : false;
        }
    
        return (
            <AdaptationPlansForm
                isFetching = {this.props.isFetching}
                SetInfoForPlan = {this.props.SetInfoForPlan}
                DataAboutPlans = {this.props.allPlans}
                name = {this.props.name}
                steps={this.props.steps}
                canCreate = {privilegeToAdd(this.props.role)}
            />
    
        );

    }
}

const mapStateToProps=(state)=>({
    isFetching: state.AuthReducer.isFetching,
    user_id: state.AuthReducer.user_id,
    allPlans: state.PlansReducer.plansList,
    name: state.AuthReducer.name,
    role: mapRoleIdToRole(state.AuthReducer['role_id']),
    steps: state.PlansReducer.stepList
});

export default connect(mapStateToProps,{ takePlans,takeSteps, SetInfoForPlan })(AdaptationPlans);