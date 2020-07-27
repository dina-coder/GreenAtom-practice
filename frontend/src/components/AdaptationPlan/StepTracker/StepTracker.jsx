import React, { useState } from 'react'
import s from './StepTracker.module.scss'


const StepTracker = (props) => {
    return (
        <div>
        {props.step !== null ?
    <div className = {s.stepContainer}>
        <div className={s.ZIndex1+ " " +(props.step===1?s.InProcess: s.Completed)}>Создание плана</div> 
        <div className={s.ZIndex2+ " " +(props.step===2?s.InProcess: props.step<2 ? s.NotCompleted : s.Completed)}>Заполнение <br/> сотрудником</div>
        <div className={s.ZIndex3+ " " +(props.step===3?s.InProcess: props.step<3 ? s.NotCompleted : s.Completed)}> Согласование <br /> руководителем</div>
        <div className={s.ZIndex4+ " " +(props.step===4?s.InProcess: props.step<4 ? s.NotCompleted : s.Completed)}> Выполнение</div>
        <div className={s.ZIndex5+ " " +(props.step===5?s.InProcess: props.step<5 ? s.NotCompleted : s.Completed)}> Оценка</div>
        <div className={s.ZIndex6+ " " +(props.step===6?s.InProcess: props.step<6 ? s.NotCompleted : s.Completed)}> Оценка завершена</div>
        </div> :''} 
        </div>)
}

export default StepTracker