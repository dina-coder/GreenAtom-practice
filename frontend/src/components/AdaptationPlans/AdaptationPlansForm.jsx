import React from 'react';
import TopPanelWithCreate from '../TopPanelWithCreate/TopPanelWithCreate';
import Filters from './Filters/Filters';
import PlansTable from './PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = (props)=> {
    return(
        <div className={style.wrapper}> 
            <TopPanelWithCreate canCreate = {props.canCreate} title="Планы адаптации" buttonTitle="план" amount={props.DataAboutPlans.length} />
            <Filters />
            <PlansTable SetInfoForPlan={props.SetInfoForPlan} DataAboutPlans={props.DataAboutPlans} name={props.name}  />
            
           
        </div>
    )
}

export default AdaptationPlansForm;