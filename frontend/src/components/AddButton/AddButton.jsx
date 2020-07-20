import React from 'react';
import style from './AddButton.module.scss';

const AddButton = (props) => {
return(
    <div className = {style.addButton}>
       + Добавить {props.title}
    </div>
)
}

export default AddButton;