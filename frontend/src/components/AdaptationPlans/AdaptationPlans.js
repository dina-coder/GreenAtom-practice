import React from 'react';
import { connect } from 'react-redux'
import {TakeInfo} from '../../redux/reducers/SuperReducer'
import {TakeHRPlan} from '../../redux/reducers/HrReducer'
import AdaptationPlansForm from './AdaptationPlansForm';

class AdaptationPlans extends React.Component {


    componentDidMount(){
        if (this.props.role_id === 1){
            this.props.TakeHRPlan()
        }
        else {
            this.props.TakeInfo(this.props.user_id)
        }
        
    }
     
    render() {
       let  DataAboutPlans = [];
      if (this.props.planForHr.length === 0){
          DataAboutPlans = this.props.planForSuper;
      }
      else {DataAboutPlans = this.props.planForHr};
        return (
            <AdaptationPlansForm
                DataAboutPlans = {DataAboutPlans}
                name = {this.props.name}
                onPlanClick = {()=>console.log("Подробнее")}
                role_id = {this.props.role_id}
            />
        );

    }
}

const mapStateToProps=(state)=>({
    user_id: state.AuthReducer.user_id,
    planForSuper: state.SuperReducer.planForSuper,
    planForHr: state.HrReducer.planForHr,
    name: state.AuthReducer.name,
    role_id:state.AuthReducer.role_id
});

export default connect(mapStateToProps,{TakeInfo,TakeHRPlan})(AdaptationPlans);