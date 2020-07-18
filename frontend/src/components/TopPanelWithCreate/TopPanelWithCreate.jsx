import React from 'react';
import style from './TopPanelWithCreate.module.scss';
import AddButton from '../AddButton/AddButton';

const TopPanelWithCreate = (props) => {
return(
    <div className={style.header}>
        <h1>{props.title} ({props.amount})</h1>
        <AddButton title={props.buttonTitle}/>
    </div>
)
}

export default TopPanelWithCreate;