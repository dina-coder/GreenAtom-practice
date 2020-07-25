import React from 'react';
import { connect } from 'react-redux';
import { takePlans, setFilter, createPlan, getPlansAmount, getFilteredList, setPlansAmount } from '../../redux/reducers/PlansReducer';
import { takeNames, takeSteps, takePositions} from '../../redux/reducers/DictReducer';
import AdaptationPlansForm from './AdaptationPlansForm';
import { SetInfoForPlan } from '../../redux/reducers/EmployeeReducer'
import { mapRoleIdToRole } from '../../utils/mapRoleIdToRole';
import { Roles } from '../../constants/roles';

class AdaptationPlans extends React.Component {

    
    componentDidMount(){
        this.props.getFilteredList(this.props.role,this.props.filters, this.props.user_id);
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
    
    arePlansExist = (list) => {
       return (list && list.length > 0);
    }

    onPageChange = (page) => {
       this.filterPlans(page);
    }

    getLastPage = () => {
        return Math.ceil(this.props.amount / 5);
    }

    filterPlans = (page) => {
        this.props.getFilteredList(this.props.role,this.props.filters, this.props.user_id, page)
    }
        
    onFilter = (filter,value) => {
        const newFilters = { ...this.props.filters, [filter]: value };
        this.props.setFilter(newFilters);
        this.props.getFilteredList(this.props.role, newFilters, this.props.user_id);
    }

    privilegeToAdd = (role) => {
        return role === Roles.HR;
    }
     
    render() {
        return (
            <AdaptationPlansForm
                isFetching={this.props.isFetching}
                SetInfoForPlan={this.props.SetInfoForPlan}
                DataAboutPlans={this.props.filteredList}
                arePlansExist={this.arePlansExist}
                name={this.props.name}
                amount={this.props.amount}
                setPlansAmount={this.props.setPlansAmount}
                steps={this.props.steps}
                filters={this.props.filters}
                canCreate={this.privilegeToAdd(this.props.role)}
                workersNames={ this.props.workersNames}
                supersNames={this.props.supersNames}
                positions={this.props.positions}
                user_id={this.props.user_id}
                createPlan={this.props.createPlan}
                role={this.props.role}
                onFilter={this.onFilter}
                filterPlans={this.filterPlans}
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
    steps: state.DictReducer.stepList,
    filters: state.PlansReducer.filters,
    filteredList: state.PlansReducer.filteredList,
    workersNames: state.DictReducer.workersNames,
    supersNames: state.DictReducer.supersNames,
    positions: state.DictReducer.positions,
    amount: state.PlansReducer.amount
});

export default connect(mapStateToProps,
            { takePlans, takeSteps, takeNames, SetInfoForPlan, setFilter, takePositions, createPlan, getPlansAmount, getFilteredList, setPlansAmount }
            )(AdaptationPlans);