import React from 'react';
import style from './Filters.module.scss';


const Filters = () =>{
    return( 
        <div className={style.search}> 
        <input className={style.peopleSearch} placeholder="Поиск по ФИО сотрудника или руководителя" />
        <select className={style.stepSearch} required>
            <option value="" disabled selected hidden>Этап</option>
            <option value="test">test</option>
        </select>
        <input className={style.dateSearch} placeholder="Период" />
        </div>
    )
}

export default Filters;