import React from 'react'
import s from './EmployeeInformation.module.scss'

const EmployeeInformation = (props) =>{
    return (
        <div  className={s.Container}>
            <table>
                <tr>
                    <td className={s.LeftSide}> Должность: </td>
                    <td className={s.RightSide}>{props.employee.position}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Руководитель: </td>
                    <td td className={s.RightSide}>{props.employee.super_id} дима дай имя</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> HR-менеджер: </td>
                    <td td className={s.RightSide}> {props.employee.hr_id} дима дай имя </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Период: </td>
                    <td td className={s.RightSide}> {props.employee.date_start} - {props.employee.date_end} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Этап: </td>
                    <td td className={s.RightSide}> {props.employee.step} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Итог: </td>
                    <td td className={s.RightSide}> {props.employee.result==0 ? 'Не пройден' : 'Пройден'} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Оценка: </td>
                    <td td className={s.RightSide}> {props.employee.grade} </td>
                </tr>
            </table>

        </div>
    )
}

export default EmployeeInformation