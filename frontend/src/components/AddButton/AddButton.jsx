import React from 'react';
import style from './AddButton.module.scss';

const AddButton = (props) => {
return(
    <button onClick={props.onClick} className = {style.addButton}>
       + Добавить {props.title}
    </button>
)
}

export default AddButton;