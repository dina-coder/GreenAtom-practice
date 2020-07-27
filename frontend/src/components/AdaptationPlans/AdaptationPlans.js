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
        this.props.getFilteredList(this.props.accountInfo.role,this.props.filters, this.props.accountInfo.user_id);
        this.props.takeSteps();
        if (this.props.accountInfo.role===Roles.HR) {
            this.props.getPlansAmount('');
            this.props.takeNames(2);
            this.props.takeNames(3);
            this.props.takePositions();
        } else{
            this.props.getPlansAmount(this.props.accountInfo.user_id);
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
        this.props.getFilteredList(this.props.accountInfo.role,this.props.filters, this.props.accountInfo.user_id, page)
    }
        
    onFilter = (filter,value) => {
        const newFilters = { ...this.props.filters, [filter]: value };
        this.props.setFilter(newFilters);
        this.props.getFilteredList(this.props.accountInfo.role, newFilters, this.props.accountInfo.user_id);
    }

    privilegeToAdd = (role) => {
        return role === Roles.HR;
    }
     
    render() {
        return (
            <AdaptationPlansForm
                canCreate={this.privilegeToAdd(this.props.accountInfo.role)}
                onFilter={this.onFilter}
                filterPlans={this.filterPlans}
                onPageChange={this.onPageChange}
                arePlansExist={this.arePlansExist}
                setPlansAmount={this.props.setPlansAmount}
                createPlan={this.props.createPlan}
                isFetching={this.props.isFetching}
                SetInfoForPlan={this.props.SetInfoForPlan}
                DataAboutPlans={this.props.filteredList}
                amount={this.props.amount}
                filters={this.props.filters}
                dict={this.props.dict}
                accountInfo={this.props.accountInfo}
            />
    
        );

    }
}

const mapStateToProps = (state) =>({
    isFetching: state.AuthReducer.isFetching,
    allPlans: state.PlansReducer.plansList,
    filters: state.PlansReducer.filters,
    filteredList: state.PlansReducer.filteredList,
    amount: state.PlansReducer.amount,
    accountInfo: {
        user_id: state.AuthReducer.user_id,
        name: state.AuthReducer.name,
        role: mapRoleIdToRole(state.AuthReducer['role_id']),
    },
    dict: {
        steps: state.DictReducer.stepList,
        workersNames: state.DictReducer.workersNames,
        supersNames: state.DictReducer.supersNames,
        positions: state.DictReducer.positions
    }
});

export default connect(mapStateToProps,
            { takePlans, takeSteps, takeNames, SetInfoForPlan, setFilter, takePositions, createPlan, getPlansAmount, getFilteredList, setPlansAmount }
            )(AdaptationPlans);