import React from 'react';
import style from './Search.module.scss';


const Search = () =>{
    return( 
        <div className={style.search}> 
        <input className={style.peopleSearch} placeholder="Поиск по ФИО сотрудника или руководителя"></input>
        <select className={style.stepSearch} required>
            <option value="" disabled selected hidden>Этап</option>
            <option value="test">test</option>
        </select>
        <input className={style.dateSearch} placeholder="Период"></input> 
        </div>
    )
}

export default Search;