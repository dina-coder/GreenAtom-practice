import React from 'react';
import TopPanelWithCreate from '../TopPanelWithCreate/TopPanelWithCreate';
import Filters from './Filters/Filters';
import PlansTable from './PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = (props)=> {
    return(
        <div className={style.wrapper}> 
            <TopPanelWithCreate role_id = {props.role_id} title="Планы адаптации" buttonTitle="план" amount={props.DataAboutPlans.length} />
            <Filters />
             <PlansTable DataAboutPlans={props.DataAboutPlans} name={props.name} onPlanClick={props.onPlanClick} />
            
           
        </div>
    )
}

export default AdaptationPlansForm;