import React from 'react';
import TopPanelWithCreate from '../TopPanelWithCreate/TopPanelWithCreate';
import Filters from './Filters/Filters';
import PlansTable from './PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = (props)=> {
    return(
        <div className = {style.wrapper}> 
            <TopPanelWithCreate 
                canCreate = {props.canCreate} 
                title = "Планы адаптации" 
                buttonTitle = "план" 
                amount = {props.DataAboutPlans.length} 
            />
            <Filters 
                search={props.filters.search}
                period={props.filters.period}
                step={props.filters.step}
                onSearchFilter={(value) => props.onFilter('search', value)} 
                onStepFilter={(value) => props.onFilter('step', value)} 
                onPeriodFilter={(value) => props.onFilter('period', value)} 
                steps={props.steps} 
            />

            <PlansTable 
                isFetching = {props.isFetching} 
                SetInfoForPlan = {props.SetInfoForPlan} 
                DataAboutPlans = {props.DataAboutPlans} 
                name = {props.name} 
            />
            
           
        </div>
    )
}

export default AdaptationPlansForm;