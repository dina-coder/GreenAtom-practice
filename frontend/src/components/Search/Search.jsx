import React from 'react';
import style from './Search.module.scss';


const Search = () =>{
    return( 
        <div className={style.search}> 
        <input className={style.peopleSearch} value="Поиск по ФИО сотрудника или руководителя"></input>
        <select className={style.stepSearch}> <option>Этап</option> </select>
        <input className={style.dateSearch} value="Период"></input> 
        </div>
    )
}

export default Search;