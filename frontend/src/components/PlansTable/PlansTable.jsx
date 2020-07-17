import React from 'react';
import arrow from '../../img/down-arrow.png';
import greenArrow from '../../img/down-arrow-green.png';
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
            </tr>
            </thead>
           {props.profile.map(x=>
               <tr>
               <th className={style.choosen}>{x.name}</th>
           <th>{props.name}</th>
               <th>ЭТАП</th>
           <th>{x.date_start}-{x.date_end}</th>
               </tr> 
            )}
       
        </table>

    </div> 
    )
}

export default PlansTable;