import React from 'react';
import ListHeader from '../ListHeader/ListHeader';
import Search from '../Search/Search';
import PlansTable from '../PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = (props)=> {
    return(
        <div className={style.wrapper}> 
            <ListHeader title="Планы адаптации" buttonTitle="план" amount={props.profile.length} />
            <Search />
            <PlansTable profile={props.profile} name={props.name} onPlanClick={props.onPlanClick} />
        </div>
    )
}

export default AdaptationPlansForm;