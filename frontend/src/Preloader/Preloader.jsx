import React from 'react'
import preloader from '../img/logo.png'
import s from './Preloader.module.scss'

let Preloader = () => {
    return (
        <div className ={s.container}>
            <img  src={preloader}/>
        </div>
    )
}
export default Preloader