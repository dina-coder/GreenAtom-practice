import React from 'react';
import AdaptationPlansForm from '../AdaptationPlans/AdaptationPlansForm';
import HeaderContainer from '../Header/HeaderContainer';

const Director = (props) =>{
    return (
        <div>
            <HeaderContainer role="Руководитель"/>
            <AdaptationPlansForm />
        </div>
    )
}

export default Director