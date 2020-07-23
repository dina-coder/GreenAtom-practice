import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import Task from './Task/Task'
import AddTaskMode from '../AddTaskMode/AddTaskMode'
import { isButtonAddEnable } from '../../../utils/isButtonAccess'

const PlanTasks = (props) => {
    const [AddTaskButton, SetTaskButton] = useState(false)
    const [activePage, setActivepage] = useState(null)

    const ClickPaginator = (plan_id, x) => {
        props.TakeTasks(plan_id, x);
        setActivepage(x-1);
    }
    let AllTasks;
    if (props.plantasks !==null) {
        AllTasks = props.plantasks.map((x, key) => <Task plan_id={props.plan_id} id={x.id}
            role_id={props.role_id}
            step={props.step}
            date_start={x.date_start}
            DeleteTaskFromEmployee={props.DeleteTaskFromEmployee}
            key={key} name={x.name}
            date_end={x.date_end} result={x.result}
            content={x.content} plan_id={props.plan_id}
            TakeTasks={props.TakeTasks}
            UpdateTaskStatusFromEmployee={props.UpdateTaskStatusFromEmployee}
            UpdateTaskFromEmployee={props.UpdateTaskFromEmployee} />)
    }
    else AllTasks = "Задачи не добавлены"
    let Pagination = [];
    let PagesAmount = Math.ceil(props.amountOfTask / 5);
    for (let i = 1; i <= PagesAmount; i++) {
        Pagination.push(i);
    }
    return (
        <div className={s.Container}>
            <h1> Задачи ({props.amountOfTask}) </h1>
            <div className={s.ButtonContainer}>
                {isButtonAddEnable(props.role_id, props.step) ?
                    <button onClick={() => SetTaskButton(true)} className={s.addButton}>+Добавить задачу</button> :
                    ''
                }
            </div>

            {AllTasks}
            {AddTaskButton === true ?
                <div><AddTaskMode SetTaskButton={SetTaskButton} date_end={props.date_end}
                    userName={props.userName} plan_id={props.plan_id}
                    CreatTaskForEmployee={props.CreatTaskForEmployee}
                    TakeTasks={props.TakeTasks} /></div> :
                ''
            }
            <div className={s.PaginationContainer}>
                {Pagination.map((x,key) => <span className={key === activePage ? s.PaginationActive : s.Pagination}  onClick={() => ClickPaginator(props.plan_id,x) }>{x}</span>)}
            </div>
            <br />
        </div>
    )
}

export default PlanTasks