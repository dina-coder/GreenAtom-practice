import React from 'react';
import AdaptationPlansForm from '../AdaptationPlans/AdaptationPlansForm';
import HeaderContainer from '../Header/HeaderContainer';

const Personnel = (props) =>{
    return (
        <div>
           <HeaderContainer role="Сотрудник кадровой службы"/>
           <AdaptationPlansForm />
        </div>
    )
}

export default Personnel