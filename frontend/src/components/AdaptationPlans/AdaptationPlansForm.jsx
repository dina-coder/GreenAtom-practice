import React from 'react';
import ListHeader from '../ListHeader/ListHeader';
import Search from '../Search/Search';
import PlansTable from '../PlansTable/PlansTable'
import style from './AdaptationPlansForm.module.scss'

const AdaptationPlansForm = ()=> {
    return(
        <div className={style.wrapper}> 
            <ListHeader title="Планы адаптации" buttonTitle="план" amount="0" />
            <Search />
            <PlansTable />
        </div>
    )
}

export default AdaptationPlansForm;