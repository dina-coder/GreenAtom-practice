import React, { useState } from 'react'
import s from './Task.module.scss'
import editionicon from '../../../../img/edit 2.png'
import deleteicon from '../../../../img/bin 1.png'
import downarrow from '../../../../img/down-arrow-green.png'


const Task = (props) =>{
    const [isFullInfo,setFullInfo] = useState(null)
    const DeleteTaskFunction = (id, plan_id) =>{
        props.DeleteTaskFromEmployee(id)
        props.TakeTasks(plan_id)
    } 
    return (
        <div className={isFullInfo === props.key ? s.ContainerBig : s.Container}>
            <div className={props.result==0 ? s.CircleFalse : s.CircleTrue}></div>
            <h3 className={s.Title}>{props.name}</h3>
            <h3 className={s.Date}>До {props.date_end}</h3>
            <img className={s.Edit} src={editionicon} />
            <img onClick={()=>DeleteTaskFunction(props.id,props.plan_id)} className={s.Delete} src={deleteicon} />
            {isFullInfo === props.key ?  
             <img className={s.downarrowTransofm} onClick={()=>{setFullInfo(-1)}} src={downarrow} /> :
            <img className={s.downarrow} onClick={()=>{setFullInfo(props.key)}} src={downarrow} />
             }
           
            {isFullInfo === props.key ? <div className={s.Description}>
                 <p className={s.DescriptionText}>{props.content}</p>
            </div>:''}
        </div>
    )
}

export default Task