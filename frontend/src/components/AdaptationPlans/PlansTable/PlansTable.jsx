import React, { useState } from 'react';
import moment from 'moment';
import arrow from '../../../img/down-arrow.png';
import greenArrow from '../../../img/down-arrow-green.png';
import rightArrow from '../../../img/right-arrow.png';
import style from "./PlansTable.module.scss";
import ParticularPlanContainer from '../ParticularPlan/ParticularPlanContainer';
import Preloader from '../../../Preloader/Preloader';



const PlansTable = (props) => {
    const [isPlanClick, setPlanClick] = useState(false)
    const TakeDataForPlanClick = (bool, user_id_for_superhr) => {
        setPlanClick(bool)
        props.SetInfoForPlan(user_id_for_superhr)
    }
    return(
    <div>
        {props.isFetching === true ? <Preloader/>:
        <table>
            <thead>
            <tr>
            <th className={style.choosen}>ФИО<img src={greenArrow}></img></th>
            <th>РУКОВОДИТЕЛЬ<img src={arrow}></img></th>
            <th>ЭТАП<img src={arrow}></img></th>
            <th>ПЕРИОД<img src={arrow}></img></th>
            <th></th>
            </tr>
            </thead>
            <tbody>
                {props.DataAboutPlans.length > 0 ?
                 props.DataAboutPlans.map(x=>
                    <tr className={style.plan}>
                        <td className={style.choosen}>{x.name}</td>
                        <td>{x.super}</td>
                        <td>{x.step}</td>
                        <td>{moment(x.date_start).format('DD.MM.YYYY')}&nbsp;-&nbsp;{moment(x.date_end).format('DD.MM.YYYY')}</td>
                        <td><button className={style.planButton}
                         onClick={()=>TakeDataForPlanClick(true,x.worker_id)}> Перейти  <img src={rightArrow}></img>
                         </button></td>
                    </tr> 
                    )
                : 'Нет планов'}
           
            </tbody>
        </table>
}
                {isPlanClick === true ? <ParticularPlanContainer/>:''}
    </div> 
            
    )
            
}

export default PlansTable;