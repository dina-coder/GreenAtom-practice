import React from 'react'
import s from './AdaptationPlanInfo.module.scss'

const AdaptationPlanInfo = (props) =>{
    return (
        <div>
            <table>
                 <tr>
                     <td><h1 className={s.Title}>План адаптации</h1></td>
                     <td><div className={s.DateOfCreation}>Дата создания {props.employee.date_creation}</div></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td className={s.LeftSide}> ФИО сотрудника: </td>
                    <td className={s.RightSide}>{props.employee.name}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Должность: </td>
                    <td className={s.RightSide}>{props.employee.position}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Руководитель: </td>
                    <td td className={s.RightSide}>{props.employee.super}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> HR-менеджер: </td>
                    <td td className={s.RightSide}> {props.employee.hr}</td>
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
                    <td td className={s.RightSide}> {props.employee.grade !=null ? props.employee.grade : "Оценка не выставлена"} </td>
                </tr>
            </table>

        </div>
    )
}

export default AdaptationPlanInfo