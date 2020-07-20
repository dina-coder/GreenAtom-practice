import React from 'react'
import s from './Forms.module.scss'

export const TextArea = ({input, meta,...props}) => {
    const hasError = meta.touched && meta.error
    return(
        <div className = {s.form+" "+(hasError ? s.error : "")}>
            <div>
                <input {...props} {...input}/>
            </div>
            {hasError && <span className = {s.worm}>{meta.error}</span>}
        </div>

    )
}