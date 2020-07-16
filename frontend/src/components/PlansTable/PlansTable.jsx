import React from 'react';
import arrow from '../../img/down-arrow.png';
import greenArrow from '../../img/down-arrow-green.png';
import style from "./PlansTable.module.scss";

const PlansTable = () => {
    return(
    <div>
        <table>
            <thead>
            <tr>
            <th className={style.choosen}>ФИО<img src={greenArrow}></img></th>
            <th>РУКОВОДИТЕЛЬ<img src={arrow}></img></th>
            <th>ЭТАП<img src={arrow}></img></th>
            <th>ПЕРИОД<img src={arrow}></img></th>
            </tr>
            </thead>
        </table>

    </div> 
    )
}

export default PlansTable;