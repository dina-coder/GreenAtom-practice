import React from 'react';
import { connect } from 'react-redux';
import { takePlans, takeNames, takeSteps, setFilter, takePositions, createPlan } from '../../redux/reducers/PlansReducer';
import AdaptationPlansForm from './AdaptationPlansForm';
import { SetInfoForPlan } from '../../redux/reducers/EmployeeReducer'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles';

class AdaptationPlans extends React.Component {

    componentDidMount(){
        this.props.takePlans(this.props.role, this.props.user_id)
            .then(()=>this.props.setFilter(this.props.filters));
        this.props.takeSteps();
        if (this.props.role===Roles.HR) {
           this.props.takeNames(2);
           this.props.takeNames(3);
           this.props.takePositions();
        }

    }
    componentDidUpdate(prevProps){
        if (prevProps.filteredList!=this.props.filteredList){
        this.setState({filteredList:this.props.filteredList})
        }
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
                workersNames={ this.props.workersNames}
                supersNames= {this.props.supersNames}
                positions = {this.props.positions}
                user_id= {this.props.user_id}
                createPlan = {this.props.createPlan}
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
    filteredList: state.PlansReducer.filteredList,
    workersNames: state.PlansReducer.workersNames,
    supersNames: state.PlansReducer.supersNames,
    positions: state.PlansReducer.positions
});

export default connect(mapStateToProps,{ takePlans,takeSteps, takeNames, SetInfoForPlan, setFilter, takePositions, createPlan })(AdaptationPlans);