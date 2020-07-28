import React, {useEffect, useState} from 'react'
import s from './AdaptationPlanInfo.module.scss'
import update from '../../../img/edit 2.png'
import { isAdaptationPlanEnable, PostToNextStep, isDirectorAgreement, isAssessment } from '../../../utils/isButtonAccess'
import Autocomplete from 'react-autocomplete'
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import 'moment/locale/ru';
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import download from '../../../img/download 1.png'
import {Steps} from "../../../constants/steps";
import { Roles } from '../../../constants/roles';


const AdaptationPlanInfo = (props) => {

    const [range, setRange] = useState({});
    let date_start_plan;
    let date_end_plan;
    if (JSON.stringify(range) === '{}') {
        date_start_plan = props.employee.date_start;
        date_end_plan = props.employee.date_end
    }
    else {
        date_start_plan = moment(range.from).format("DD.MM.YYYY");
        date_end_plan = moment(range.to).format("DD.MM.YYYY");
    }
    const [Step, setStep] = useState(props.employee.step)
    const [isUpdateMode, setUpdateMode] = useState(false)
    const [Grade, setGrade] = useState(props.employee.grade)
    const [superName, setSuperName] = useState(props.employee.super);
    const [Position, setPosition] = useState(props.employee.position);
    const [hrName, setHrName] = useState(props.employee.hr);
    const UpdatePlan = (worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, id) => {
        props.updatePlan(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, id)
            .then(() => props.GetEmployeeProfileInfo(worker_id));
        setUpdateMode(false)
    }
    useEffect(() => {
        setStep(props.employee.step);
        setGrade(props.employee.grade);
        setSuperName(props.employee.super);
        setPosition(props.employee.position);
        setHrName(props.employee.hr);
    },[props.employee])

    let InfoPlan = props.employee;
    const FindIdUser = (Name, Names) => {
        let nameId = Names.find(x => x.name === Name).id
        if (nameId) return nameId
        else return null
    }
    return (
        <div className={s.container}>
            <div className={s.infoHeader}>
                <div>
                    <h1 className={s.Title}>План адаптации</h1>
                    <div className={s.DateOfCreation}>Создан: {props.employee.date_creation}</div>
                </div>
                {isAdaptationPlanEnable(props.role_id, props.employee.step)
                &&  <div className={s.editMode}>
                    <img alt = '' onClick={() => setUpdateMode(true)} src={update} />
                </div>}
                <div className={s.download}>
                    {props.role_id === 3  ?
                        <img alt = '' src={download} onClick={() => props.CreatePdf(props.user_id)} /> :
                        <img alt = '' src={download} onClick={() => props.CreatePdf(props.worker_id)} />
                    }
                </div>

                {PostToNextStep(props.role_id, props.employee.step) ?
                    InfoPlan.step === Steps.EmployeeFilling ?
                        <div className={s.ButtonContainer2}>
                            <button onClick={() => UpdatePlan(InfoPlan.worker_id, InfoPlan.position_id, InfoPlan.super_id,
                                InfoPlan.hr_id, InfoPlan.step_id + 1, InfoPlan.date_start, InfoPlan.date_end, InfoPlan.result,
                                InfoPlan.grade_id, InfoPlan.plan_id)} className={s.addButton2}>Отправить на согласование</button>
                        </div>
                        : <div className={s.ButtonContainer2}>
                            <button onClick={() => UpdatePlan(InfoPlan.worker_id, InfoPlan.position_id, InfoPlan.super_id,
                                InfoPlan.hr_id, InfoPlan.step_id + 1, InfoPlan.date_start, InfoPlan.date_end, InfoPlan.result,
                                InfoPlan.grade_id, InfoPlan.plan_id)} className={s.addButton2}>Отправить на оценку</button>
                        </div>

                    : ''}
            </div>

            <table>
                <tbody>
                    <tr>
                        <td className={s.LeftSide}> ФИО сотрудника: </td>
                        <td className={s.RightSide}>{InfoPlan.name}</td>
                    </tr>

                    <tr>
                        <td className={s.LeftSide}> Должность: </td>
                        {isUpdateMode === false ? <td className={s.RightSide}>{InfoPlan.position}</td> :
                            isAssessment(props.role_id, props.employee.step) ? <td className={s.RightSide}>{InfoPlan.position}</td> :
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
                            <td className={s.RightSide}>{InfoPlan.super}</td> :
                            isAssessment(props.role_id, props.employee.step) ? <td td className={s.RightSide}>{InfoPlan.super}</td> :
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
                            <td className={s.RightSide}> {InfoPlan.hr}</td> :
                            isAssessment(props.role_id, props.employee.step) ? <td className={s.RightSide}> {InfoPlan.hr}</td> :
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
                            <td className={s.RightSide}> {InfoPlan.date_start} - {InfoPlan.date_end} </td> :
                            isAssessment(props.role_id, props.employee.step) ? <td className={s.RightSide}> {InfoPlan.date_start} - {InfoPlan.date_end} </td> :
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
                            <td className={s.RightSide}> {InfoPlan.step} </td> :
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
                        <td style={
                                {fontSize:(isUpdateMode ? '13px' : '14.5px'),
                                paddingBottom: isUpdateMode ? '5px':''}
                            }>
                            {InfoPlan.grade_id < 5
                                ? "Программа испытательного срока пройдена"
                                : "Программа испытательного срока не пройдена"}
                        </td>
                    </tr>

                    <tr>
                        <td className={s.LeftSide}> Оценка: </td>
                        {isUpdateMode === false ? <td className={s.RightSide}> {InfoPlan.grade} </td> :
                            isDirectorAgreement(props.role_id, props.employee.step) ? <td className={s.RightSide}> {InfoPlan.grade != null ? InfoPlan.grade : "Оценка не выставлена"} </td> :
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
                        <td></td>
                        <td  className={s.UpdateContainer}>
                            {isUpdateMode === true ? <button className={s.Update} onClick={() => UpdatePlan(InfoPlan.worker_id, FindIdUser(Position, props.positions),
                                FindIdUser(superName, props.supersNames), FindIdUser(hrName, props.hrNames), FindIdUser(Step, props.stepList),
                                date_start_plan, date_end_plan, FindIdUser(Grade, props.grades) < 5 ? 1 : 0, FindIdUser(Grade, props.grades),
                                InfoPlan.plan_id)}>Изменить</button> : ''}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default AdaptationPlanInfo