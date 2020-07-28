import React, { useState } from 'react';
import TopPanelWithCreate from '../TopPanelWithCreate/TopPanelWithCreate';
import Filters from './Filters/Filters';
import PlansTable from './PlansTable/PlansTable';
import PlanCreation from './PlanCreation/PlanCreation';
import style from './AdaptationPlansForm.module.scss';

const AdaptationPlansForm = (props)=> {
    const [isCreationOpen, setIsCreationOpen] = useState(false);

    return(
        <div className = {style.wrapper}> 
            <TopPanelWithCreate 
                canCreate = {props.canCreate} 
                title = "Планы адаптации" 
                buttonTitle = "план" 
                onClick={()=>setIsCreationOpen(true)}
                amount = {props.amount} 
            />
            <Filters 
                search={props.filters.search}
                period={props.filters.period}
                step={props.filters.step}
                onSearchFilter={(value) => props.onFilter('search', value)}
                onStepFilter={(value) => props.onFilter('step', value)} 
                onPeriodFilter={(value) => props.onFilter('period', value)} 
                steps={props.dict.steps}
            />

            <PlansTable
                currentPage={props.currentPage}
                isFetching = {props.isFetching}
                sort = {props.sort}
                onSort = {props.onSort}
                SetInfoForPlan = {props.SetInfoForPlan} 
                DataAboutPlans = {props.DataAboutPlans} 
                role={props.accountInfo.role}
                arePlansExist={props.arePlansExist}
                userId={props.accountInfo.user_id}
                filterPlans={props.filterPlans}
                onPageChange={props.onPageChange}
                name = {props.accountInfo.name}
                amount={props.amount}
            />

            {isCreationOpen && <PlanCreation 
            createPlan={props.createPlan}
            setPlansAmount={props.setPlansAmount}
            user_id={props.accountInfo.user_id}
            plans={props.DataAboutPlans}
            positions={props.dict.positions}
            workers={props.dict.workersNames}
            supers={props.dict.supersNames}
            amount={props.amount}
            filterPlans={props.filterPlans}
            setIsCreationOpen={setIsCreationOpen}/>}
        </div>
    )
}

export default AdaptationPlansForm;