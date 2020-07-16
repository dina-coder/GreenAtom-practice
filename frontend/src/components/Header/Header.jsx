import React from 'react';
import style from "./Header.module.scss";
import logoHeader from './../../img/logo_header.svg';

const Header = (props) => {
    const LogOut = () =>{
        props.SetLogOut()
    }
    return(
        <div className={style.header}> 
            <div className={style.headerContainer}>
                <img src={logoHeader}></img>
                <div className={style.userInfo}>
                    <p>{props.name}</p>
                    <div className={style.userAdditionInfo}>
                        <p>{props.role}</p>
                        <button onClick = {LogOut}  className={style.headerButton}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Header;