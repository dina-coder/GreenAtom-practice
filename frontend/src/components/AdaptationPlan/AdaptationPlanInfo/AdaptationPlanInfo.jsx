import React from 'react'
import s from './AdaptationPlanInfo.module.scss'
import update from '../../../img/edit 2.png'
import { isAdaptationPlanEnable, PostToNextStep } from '../../../utils/isButtonAccess'

const AdaptationPlanInfo = (props) =>{
    const UpdatePlan = (worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment, id) =>{
        props.updatePlan(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment, id)
        props.GetEmployeeProfileInfo(worker_id)
    }
    let InfoPlan = props.employee

    return (
        <div>
            {isAdaptationPlanEnable(props.role_id,props.employee.step)
            ?  <img className = {s.editMode} src = {update}/> : ''}
            {PostToNextStep(props.role_id,props.employee.step) ? 
             InfoPlan.step === 'Заполнение сотрудником' ?
            <div className={s.ButtonContainer2}>
                <button onClick = {()=>UpdatePlan(InfoPlan.worker_id,InfoPlan.position_id,InfoPlan.super_id,
                    InfoPlan.hr_id,InfoPlan.step_id+1,InfoPlan.date_start,InfoPlan.date_end,InfoPlan.result,
                    InfoPlan.grade_id,InfoPlan.comment,InfoPlan.plan_id )} className={s.addButton2}>Отправить на согласование</button>
        </div>: <div className={s.ButtonContainer2}>
                <button onClick = {()=>UpdatePlan(InfoPlan.worker_id,InfoPlan.position_id,InfoPlan.super_id,
                    InfoPlan.hr_id,InfoPlan.step_id+1,InfoPlan.date_start,InfoPlan.date_end,InfoPlan.result,
                    InfoPlan.grade_id,InfoPlan.comment,InfoPlan.plan_id )} className={s.addButton2}>Отправить на оценку</button>
        </div>
        
        : '' }
           
            <table>
                 <tr>
                     <td><h1 className={s.Title}>План адаптации</h1></td>
                     <td><div className={s.DateOfCreation}>Дата создания {props.employee.date_creation}</div></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td className={s.LeftSide}> ФИО сотрудника: </td>
                    <td className={s.RightSide}>{InfoPlan.name}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Должность: </td>
                    <td className={s.RightSide}>{InfoPlan.position}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Руководитель: </td>
                    <td td className={s.RightSide}>{InfoPlan.super}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> HR-менеджер: </td>
                    <td td className={s.RightSide}> {InfoPlan.hr}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Период: </td>
                    <td td className={s.RightSide}> {InfoPlan.date_start} - {props.employee.date_end} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Этап: </td>
                    <td td className={s.RightSide}> {InfoPlan.step} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Итог: </td>
                    <td td className={s.RightSide}> {InfoPlan.result==0 ? 'Не пройден' : 'Пройден'} </td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Оценка: </td>
                    <td td className={s.RightSide}> {InfoPlan.grade !=null ? props.employee.grade : "Оценка не выставлена"} </td>
                </tr>
            </table>

        </div>
    )
}

export default AdaptationPlanInfo