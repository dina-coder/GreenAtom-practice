import React from 'react';
import style from "./Header.module.scss";
import logoHeader from './../../img/logo_header.svg';

const Header = () => {
    return(
        <div className={style.header}> 
            <div className={style.headerContainer}>
                <img src={logoHeader}></img>
                <div className={style.userInfo}>
                    <p>Фамилия Имя</p>
                    <div className={style.userAdditionInfo}>
                        <p>Сотрудник</p>
                        <button className={style.headerButton}>Byiti</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header;