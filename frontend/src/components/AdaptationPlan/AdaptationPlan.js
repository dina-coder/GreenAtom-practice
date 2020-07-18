import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import AdaptationPlanForm from './AdaptationPlanForm'





class AdaptationPlan extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>
        console.log(this.props.employee)
         return <AdaptationPlanForm name={this.props.name} employee={this.props.employee} plantasks={this.props.plantasks} date_creation={this.props.date_creation}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id,
    employee:state.AuthReducer.employee_info,
    plantasks:state.AuthReducer.plantasks,
    date_creation: state.AuthReducer.date_creation
});

export default  connect (mapStateToProps) (AdaptationPlan)
