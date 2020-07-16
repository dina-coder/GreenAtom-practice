import React from 'react';
import style from './ListHeader.module.scss';
import AddButton from '../AddButton/AddButton';

const ListHeader = (props) => {
return(
    <div className={style.header}>
        <h1>{props.title} ({props.amount})</h1>
        <AddButton title={props.buttonTitle}/>
    </div>
)
}

export default ListHeader;