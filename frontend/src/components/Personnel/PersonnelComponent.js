import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Personnel from './Personnel';






class PersonnelComponent extends React.Component
{
    componentDidMount(){
    //для запросиков
        
       
    }
    render (){
        if (this.props.isAuth === false) return <Redirect to={'/'}/>

         return <Personnel/>
       
    }
}
const mapStateToProps=(state)=>({
    
});

export default  connect (mapStateToProps) (PersonnelComponent)
