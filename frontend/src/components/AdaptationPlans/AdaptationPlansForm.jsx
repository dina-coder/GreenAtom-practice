import React from 'react';
import TopPanelWithCreate from '../TopPanelWithCreate/TopPanelWithCreate';
import Filters from './Filters/Filters';
import PlansTable from './PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = (props)=> {
    return(
        <div className={style.wrapper}> 
            <TopPanelWithCreate title="Планы адаптации" buttonTitle="план" amount={props.profile.length} />
            <Filters />
            <PlansTable profile={props.profile} name={props.name} onPlanClick={props.onPlanClick} />
        </div>
    )
}

export default AdaptationPlansForm;