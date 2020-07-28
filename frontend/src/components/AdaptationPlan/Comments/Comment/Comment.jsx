import React from 'react'
import s from './Comment.module.scss'


const Comment = (props) => {
    return (
        <div className={s.Container}>
            <div className={s.Title}>
                <h4 className={s.Name}> {props.name} </h4>
                <h4 className={s.Role}>{props.role}</h4>
            </div>
            <div className={s.Content}> {props.content}</div>
            <div className={s.Date}> {props.date_creation}</div>
        </div>
    )
}

export default Comment