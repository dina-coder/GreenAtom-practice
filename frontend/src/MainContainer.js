import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Personnel from './Personnel/Personnel';
import Director from './Director/Director';
import Employee from './Employee/Employee';





class MainContainer extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/login'}/>
        if (this.props.role_id===1) return <Personnel name={this.props.name}/>
        if (this.props.role_id===2) return <Director name={this.props.name}/>
        if (this.props.role_id===3) return <Employee name={this.props.name}/>
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    role_id:state.AuthReducer.role_id,
    user_id:state.AuthReducer.user_id
});

export default  connect (mapStateToProps) (MainContainer)
