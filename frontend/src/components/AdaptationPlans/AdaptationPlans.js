import React from 'react';
import { connect } from 'react-redux';
import { takePlans, takeNames, takeSteps, setFilter, takePositions, createPlan, getPlansAmount } from '../../redux/reducers/PlansReducer';
import AdaptationPlansForm from './AdaptationPlansForm';
import { SetInfoForPlan } from '../../redux/reducers/EmployeeReducer'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles';

class AdaptationPlans extends React.Component {

    
    componentDidMount(){
              
            // .then(()=>!(this.props.allPlans.hasOwnProperty('empty'))
            // && this.props.setFilter(this.props.filters));
        this.props.takeSteps();
        if (this.props.role===Roles.HR) {
            this.props.getPlansAmount('');
            this.props.takeNames(2);
            this.props.takeNames(3);
            this.props.takePositions();
        } else{
            console.log(this.props.user_id);
            this.props.getPlansAmount(this.props.user_id);
        }
    }

    componentDidUpdate(prevProps){

        if (prevProps.allPlans!==this.props.allPlans){
            this.props.setFilter(this.props.filters);   
        }
    }
    
    onPageChange = (page) => {
        this.props.takePlans(this.props.role, this.props.user_id, page);
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
                isFetching={this.props.isFetching}
                SetInfoForPlan={this.props.SetInfoForPlan}
                DataAboutPlans={this.props.filteredList}
                name={this.props.name}
                amount={this.props.amount}
                steps={this.props.steps}
                onFilter={this.onFilter}
                filters={this.props.filters}
                canCreate={privilegeToAdd(this.props.role)}
                workersNames={ this.props.workersNames}
                supersNames={this.props.supersNames}
                positions={this.props.positions}
                user_id={this.props.user_id}
                createPlan={this.props.createPlan}
                role={this.props.role}
                onPageChange={this.onPageChange}
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
    positions: state.PlansReducer.positions,
    amount: state.PlansReducer.amount
});

export default connect(mapStateToProps,
            { takePlans,takeSteps, takeNames, SetInfoForPlan, setFilter, takePositions, createPlan, getPlansAmount }
            )(AdaptationPlans);