import React from 'react'
import HeaderContainer from '../Header/HeaderContainer'
import EmployeeInformation from './EmployeeInformation/EmployeeInformation'
import s from './Employee.module.scss'


const Employee = (props) => {
    return (
        <div>
            <HeaderContainer role="Сотрудник"/>
            <div className={s.wrapper}>
                <EmployeeInformation employee={props.employee} />
            </div>
        </div>
    )
}

export default Employee