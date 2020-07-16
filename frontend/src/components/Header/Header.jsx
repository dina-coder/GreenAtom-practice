import React from 'react';
import style from "./Header.module.scss";
import logoHeader from './../../img/logo_header.svg';

const Header = (props) => {
    return(
        <div className={style.header}> 
            <div className={style.headerContainer}>
                <img src={logoHeader}></img>
                <div className={style.userInfo}>
                    <p>{props.name}</p>
                    <div className={style.userAdditionInfo}>
                        <p>{props.role}</p>
                        <button className={style.headerButton}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header;