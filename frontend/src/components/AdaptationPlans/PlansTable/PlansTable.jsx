import React from 'react';
import moment from 'moment';
import arrow from '../../../img/down-arrow.png';
import greenArrow from '../../../img/down-arrow-green.png';
import rightArrow from '../../../img/right-arrow.png';
import style from "./PlansTable.module.scss";


const PlansTable = (props) => {
    return(
    <div>
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
            {props.DataAboutPlans.map(x=>
                <tr className={style.plan}>
                    <td className={style.choosen}>{x.name}</td>
                    <td>{x.super}</td>
                    <td>{x.step}</td>
                    <td>{moment(x.date_start).format('DD.MM.YYYY')}&nbsp;-&nbsp;{moment(x.date_end).format('DD.MM.YYYY')}</td>
                    <td><button className={style.planButton}
                     onClick={props.onPlanClick}>Перейти  <img src={rightArrow}></img>
                     </button></td>
                </tr> 
                )}
            </tbody>
        </table>


    </div> 
    )
}

export default PlansTable;