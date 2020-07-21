import React from 'react';
import { connect } from 'react-redux';
import { takePlans, takeSteps, setFilter } from '../../redux/reducers/PlansReducer';
import AdaptationPlansForm from './AdaptationPlansForm';
import {SetInfoForPlan} from '../../redux/reducers/EmployeeReducer'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles';

class AdaptationPlans extends React.Component {

    componentDidMount(){
        this.props.takePlans(this.props.role, this.props.user_id)
            .then(()=>this.props.setFilter(this.props.filters));
        this.props.takeSteps();
    }

    onFilter = (filter,value) => {
        this.props.setFilter({...this.props.filters, [filter]: value})
    }
     
    render() {
        const privilegeToAdd = (role) => {
            return role === Roles.HR ? true : false;
        }
    
        return (
            <AdaptationPlansForm
                isFetching = {this.props.isFetching}
                SetInfoForPlan = {this.props.SetInfoForPlan}
                DataAboutPlans = {this.props.filteredList}
                name = {this.props.name}
                steps={this.props.steps}
                onFilter={this.onFilter}
                filters={this.props.filters}
                canCreate = {privilegeToAdd(this.props.role)}
            />
    
        );

    }
}

const mapStateToProps = (state) =>({
    isFetching: state.AuthReducer.isFetching,
    user_id: state.AuthReducer.user_id,
    allPlans: state.PlansReducer.plansList,
    name: state.AuthReducer.name,
    role: mapRoleIdToRole(state.AuthReducer['role_id']),
    steps: state.PlansReducer.stepList,
    filters: state.PlansReducer.filters,
    filteredList: state.PlansReducer.filteredList
});

export default connect(mapStateToProps,{ takePlans,takeSteps, SetInfoForPlan, setFilter })(AdaptationPlans);