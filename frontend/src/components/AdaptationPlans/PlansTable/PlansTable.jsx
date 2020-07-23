import React, { useState } from 'react';
import arrow from '../../../img/down-arrow.png';
import greenArrow from '../../../img/down-arrow-green.png';
import rightArrow from '../../../img/right-arrow.png';
import style from "./PlansTable.module.scss";
import Preloader from '../../../Preloader/Preloader';
import AdaptationPlan from '../../AdaptationPlan/AdaptationPlan';



const PlansTable = (props) => {
    const [worker_id, setWorker_id] = useState(undefined)
    const [isPlanClick, setPlanClick] = useState(false)
    const TakeDataForPlanClick = (bool,worker_id) => {
        setPlanClick(bool)
        setWorker_id(worker_id)
    }
    const getNewPage = (pageNum) => {
        props.takePlans(props.role, props.userId, pageNum);
    }

    let pagination = [];
    const pagesAmount = Math.ceil(props.amount / 5);
    for (let i = 1; i <= pagesAmount; i++) {
        pagination.push(i);
    }
    return(
    <div>
        {props.isFetching === true ? <Preloader/>:
        props.DataAboutPlans.length > 0 ?
        <>
        <table>
            <thead>
            <tr>
            <th className={style.choosen}>ФИО<img src = {greenArrow} alt = ""></img></th>
            <th>РУКОВОДИТЕЛЬ<img src = {arrow} alt = ""></img></th>
            <th>ЭТАП<img src = {arrow} alt = ""></img></th>
            <th>ПЕРИОД<img src = {arrow} alt = ""></img></th>
            <th></th>
            </tr>
            </thead>
            <tbody>
                { props.DataAboutPlans.map(x =>
                    <tr className = {style.plan} key={x.name}>
                        <td className = {style.choosen}>{x.name}</td>
                        <td>{x.super}</td>
                        <td>{x.step}</td>
                        <td>{x.date_start}&nbsp;-&nbsp;{x.date_end}</td>
                        <td><button className = {style.planButton}
                         onClick = {()=>TakeDataForPlanClick(true,x.worker_id)}> Перейти  <img src = {rightArrow} alt = ""></img>
                         </button></td>
                    </tr> 
                    )
                }
           
            </tbody>
        </table>
            <div className={style.paginationContainer}>
            {pagination.map((x) => <span key={x} className={style.pagination} onClick={() => getNewPage(x) }>{x}</span>)}
            </div>
        </>
        : <div style={{
            fontSize:'26px',
            textAlign: 'center',
            marginTop: '20px',
            color:'rgba(90, 90, 93, 0.7)'}}
        > Планов нет </div>
        }
                {isPlanClick && <AdaptationPlan
                worker_id = {worker_id}
                setPlanClick = {setPlanClick} />}

    </div> 
            
    )
            
}

export default PlansTable;