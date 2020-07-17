import React from 'react';
import AdaptationPlans from '../AdaptationPlans/AdaptationPlans';
import HeaderContainer from '../Header/HeaderContainer';

const Director = (props) =>{
    return (
        <div>
            <HeaderContainer role="Руководитель"/>
            <AdaptationPlans />
        </div>
    )
}

export default Director