import React from 'react';
import Header from '../Header/Header';
import AdaptationPlansForm from '../AdaptationPlans/AdaptationPlansForm';

const Personnel = (props) =>{
    return (
        <div>
           <Header SetLogOut={props.SetLogOut} name={props.name} role="Сотрудник кадровой службы"/>
           <AdaptationPlansForm />
        </div>
    )
}

export default Personnel