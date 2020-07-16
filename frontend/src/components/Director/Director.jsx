import React from 'react';
import Header from '../Header/Header';
import AdaptationPlansForm from '../AdaptationPlans/AdaptationPlansForm';

const Director = (props) =>{
    return (
        <div>
            <Header SetLogOut={props.SetLogOut} name={props.name} role="Руководитель"/>
            <AdaptationPlansForm />
        </div>
    )
}

export default Director