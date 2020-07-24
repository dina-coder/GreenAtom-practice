import React, { useState } from 'react'
import s from './AdaptationPlanInfo.module.scss'
import update from '../../../img/edit 2.png'
import { isAdaptationPlanEnable, PostToNextStep } from '../../../utils/isButtonAccess'
import Autocomplete from 'react-autocomplete'
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';

const AdaptationPlanInfo = (props) => {
    const ResultAccess = (result) => {
        if (result === 0) { return 'Не пройден' } else return 'Пройден'
    }
    const resultNames = ['Пройден', 'Не пройден']
    const [range, setRange] = useState({});
    let date_start_plan;
    let date_end_plan;
    if (JSON.stringify(range)=='{}'){
         date_start_plan = props.employee.date_start;
         date_end_plan =props.employee.date_end
    }
    else {
         date_start_plan = moment(range.from).format("DD.MM.YYYY");
         date_end_plan = moment(range.to).format("DD.MM.YYYY");
    }
   
    const [Step, setStep] = useState(props.employee.step)
    const [Result, setResult] = useState(ResultAccess(props.employee.result))
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [Grade, setGrade] = useState(props.employee.grade)
    const [superName, setSuperName] = useState(props.employee.super);
    const [Position, setPosition] = useState(props.employee.position);
    const [hrName, setHrName] = useState(props.employee.hr);
    const [comment, setComment] = useState(props.employee.comment)
    const UpdatePlan = (worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment, id) => {
        props.updatePlan(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, comment, id)
        .then(() => props.GetEmployeeProfileInfo(worker_id));
        setUpdateMode(false)
    }
    const NewComment = (e) => {
        setComment(e.currentTarget.value)
    }
    let InfoPlan = props.employee

    const FindIdUser = (Name, Names) => {
        let nameId = Names.find(x => x.name === Name).id
        console.log(Name, Names, nameId)
        if (nameId) return nameId
        else return null
    }

    const ResultId = (result) => {
        if (result === 'Пройден') {
            return 1
        }
        else return 0
    }
    return (
        <div className={s.container}>
            {isAdaptationPlanEnable(props.role_id, props.employee.step)
                ? <img onClick={() => setUpdateMode(true)} className={s.editMode} src={update} /> : ''}


            <table>
                <tr>
                    <td><h1 className={s.Title}>План адаптации</h1>
                        <div className={s.DateOfCreation}>Создан: {props.employee.date_creation}</div></td>
                    <td>            {PostToNextStep(props.role_id, props.employee.step) ?
                        InfoPlan.step === 'Заполнение сотрудником' ?
                            <div className={s.ButtonContainer2}>
                                <button onClick={() => UpdatePlan(InfoPlan.worker_id, InfoPlan.position_id, InfoPlan.super_id,
                                    InfoPlan.hr_id, InfoPlan.step_id + 1, InfoPlan.date_start, InfoPlan.date_end, InfoPlan.result,
                                    InfoPlan.grade_id, InfoPlan.comment, InfoPlan.plan_id)} className={s.addButton2}>Отправить на согласование</button>
                            </div> : <div className={s.ButtonContainer2}>
                                <button onClick={() => UpdatePlan(InfoPlan.worker_id, InfoPlan.position_id, InfoPlan.super_id,
                                    InfoPlan.hr_id, InfoPlan.step_id + 1, InfoPlan.date_start, InfoPlan.date_end, InfoPlan.result,
                                    InfoPlan.grade_id, InfoPlan.comment, InfoPlan.plan_id)} className={s.addButton2}>Отправить на оценку</button>
                            </div>

                        : ''}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td className={s.LeftSide}> ФИО сотрудника: </td>
                    <td className={s.RightSide}>{InfoPlan.name}</td>
                </tr>

                <tr>
                    <td className={s.LeftSide}> Должность: </td>
                    {isUpdateMode === false ? <td className={s.RightSide}>{InfoPlan.position}</td> :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                props.positions.map(positions => ({ label: positions.name }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={Position}
                            onChange={(e) => setPosition(e.target.value)}
                            onSelect={(val) => setPosition(val)}
                        />
                    }

                </tr>

                <tr>
                    <td className={s.LeftSide}> Руководитель: </td>

                    {isUpdateMode === false ?
                        <td td className={s.RightSide}>{InfoPlan.super}</td> :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                props.supersNames.map(worker => ({ label: worker.name }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={superName}
                            onChange={(e) => setSuperName(e.target.value)}
                            onSelect={(val) => setSuperName(val)}
                        />}
                </tr>

                <tr>
                    <td className={s.LeftSide}> HR-менеджер: </td>
                    {isUpdateMode === false ?
                        <td td className={s.RightSide}> {InfoPlan.hr}</td> :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                props.hrNames.map(hr => ({ label: hr.name }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={hrName}
                            onChange={(e) => setHrName(e.target.value)}
                            onSelect={(val) => setHrName(val)}
                        />
                    }
                </tr>

                <tr>
                    <td className={s.LeftSide}> Период: </td>
                    {isUpdateMode === false ?
                        <td td className={s.RightSide}> {InfoPlan.date_start} - {InfoPlan.date_end} </td>
                        :
                        <DayPickerInput
                            component={props => <input className={s.periodInput}  {...props} />}
                            placeholder="Период"
                            formatDate={formatDate}
                            parseDate={parseDate}
                            hideOnDayClick={!!range.to}
                            value={!!(range.to) ?
                                moment(range.from).format("DD.MM.YYYY") + "-" + moment(range.to).format("DD.MM.YYYY")
                                : props.employee.date_start + '-' + props.employee.date_end}
                            dayPickerProps={{
                                localeUtils: MomentLocaleUtils,
                                locale: "ru",
                                selectedDays: range,
                                onDayClick: ((day) => setRange(range => DateUtils.addDayToRange(day, range)))
                            }}
                        />
                    }
                </tr>

                <tr>
                    <td className={s.LeftSide}> Этап: </td>
                    {isUpdateMode === false ?
                        <td td className={s.RightSide}> {InfoPlan.step} </td> :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                props.stepList.map(onestep => ({ label: onestep.name }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={Step}
                            onChange={(e) => setStep(e.target.value)}
                            onSelect={(val) => setStep(val)}
                        />
                    }
                </tr>

                <tr>
                    <td className={s.LeftSide}> Итог: </td>
                    {isUpdateMode === false ?
                        <td td className={s.RightSide}> {ResultAccess(InfoPlan.result)} </td>
                        :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                resultNames.map(oneresult => ({ label: oneresult }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={Result}
                            onChange={(e) => setResult(e.target.value)}
                            onSelect={(val) => setResult(val)}
                        />
                    }
                </tr>

                <tr>
                    <td className={s.LeftSide}> Оценка: </td>
                    {isUpdateMode === false ? <td className={s.RightSide}> {InfoPlan.grade != null ? InfoPlan.grade : "Оценка не выставлена"} </td> :
                        <Autocomplete
                            getItemValue={(item) => item.label}
                            items={
                                props.grades.map(onegrade => ({ label: onegrade.name }))
                            }
                            renderItem={(item, isHighlighted) =>
                                <div style={{ background: isHighlighted ? 'rgba(140, 197, 71, 0.5)' : 'white' }}>
                                    {item.label}
                                </div>}
                            value={Grade}
                            onChange={(e) => setGrade(e.target.value)}
                            onSelect={(val) => setGrade(val)}
                        />
                    }

                </tr>
                <tr>
                    <td className={s.LeftSide}> Комментарий: </td>
                    {isUpdateMode === false ?
                        <td className={s.RightSide}> {InfoPlan.comment} </td> :
                        <input value={comment} onChange={NewComment} />}
                </tr>
            </table>
            <div className={s.UpdateContainer}>
                {isUpdateMode === true ? <button className={s.Update} onClick={() => UpdatePlan(InfoPlan.worker_id, FindIdUser(Position, props.positions),
                    FindIdUser(superName, props.supersNames), FindIdUser(hrName, props.hrNames), FindIdUser(Step, props.stepList),
                    date_start_plan, date_end_plan, ResultId(Result), FindIdUser(Grade, props.grades),
                    comment, InfoPlan.plan_id)}>Изменить</button> : ''}
            </div>
        </div>
    )
}

export default AdaptationPlanInfo