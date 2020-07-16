import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Director from './Director';





class DirectorComponent extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>

         return <Director name={this.props.name}/>
       
    }
}
const mapStateToProps=(state)=>({
    
    isAuth:state.AuthReducer.isAuth,
    name:state.AuthReducer.name,
    user_id:state.AuthReducer.user_id
});

export default  connect (mapStateToProps) (DirectorComponent)
