import React from 'react';
import style from './Filters.module.scss';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'moment/locale/ru';
import  MomentLocaleUtils from 'react-day-picker/moment';


const Filters = () =>{
    return( 
        <div className={style.search}> 
        <input className={style.peopleSearch} placeholder="Поиск по ФИО сотрудника или руководителя" />
        <select className={style.stepSearch} required>
            <option value="" disabled selected hidden>Этап</option>
            <option value="test">test</option>
        </select>
        <DayPickerInput localeUtils={MomentLocaleUtils} locale="ru" className={style.DayPickerInput} placeholder="Период" />
        </div>
    )
}

export default Filters;