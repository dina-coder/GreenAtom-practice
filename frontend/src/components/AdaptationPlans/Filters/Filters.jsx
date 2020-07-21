import React, { useState,useCallback }  from 'react';
import style from './Filters.module.scss';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import  MomentLocaleUtils, { formatDate, parseDate }  from 'react-day-picker/moment';


const Filters = (props) =>{
    const [range,setRange] = useState({});

    const onSearchChange = useCallback((event) => {
        const value = event.target.value;
        props.onSearchFilter(value);
    });

    const onStepChange = useCallback((event) => {
        const value = event.target.value;
        props.onStepFilter(value === 'all' ? null : value);
    });

    const onPeriodChange = useCallback((event) => {
        const value = event.props.value;
        props.onPeriodFilter(value);
    });

    return( 
       <div className={style.search}> 
            <input className={style.peopleSearch}
            value={props.search} 
            onInput={onSearchChange}
            placeholder="Поиск по ФИО сотрудника или руководителя" />
            <select 
            className={style.stepSearch}
            required
            onChange={onStepChange}
            >
                <option value="" disabled selected hidden>Этап</option>
                <option value="all">Все этапы</option>

                { props.steps.map(step =>
                  <option value = {step.name}>{step.name}</option>
                )}
                
            </select>
            <div className = {style.container}>
                <DayPickerInput 
                    component={props =><input className={style.periodInput}  {...props}/>}
                    placeholder="Период"
                    formatDate ={formatDate}
                    parseDate={parseDate}
                    onDayChange={(day,mod,dayPickerInput)=> onPeriodChange(dayPickerInput)}
                    hideOnDayClick={!!range.to}
                    value = {!!(range.to) ?
                        moment(range.from).format("DD.MM.YYYY") + "-" + moment(range.to).format("DD.MM.YYYY")
                        :""}
                    dayPickerProps={{
                        localeUtils:MomentLocaleUtils,
                        locale:"ru",
                        selectedDays:range,
                        onDayClick:((day)=> setRange(range => DateUtils.addDayToRange(day,range)))
                        }}  
                />
                <button style={{display:!range.to ? "none" : "inline"}}
                    className={style.resetBtn}
                    onClick={()=>{setRange({}); props.onPeriodFilter(null)}}>            
                    Сбросить
                </button>
            </div>
        </div>
    )
}

export default Filters;