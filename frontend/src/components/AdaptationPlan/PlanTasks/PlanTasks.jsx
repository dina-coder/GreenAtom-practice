import React, { useState } from 'react'
import s from './PlanTasks.module.scss'
import previousPageArrow from '../../../img/previous-page.png';
import nextPageArrow from '../../../img/next-page.png';
import Task from './Task/Task'
import AddTaskMode from '../AddTaskMode/AddTaskMode'
import { isButtonAddEnable } from '../../../utils/isButtonAccess'

const PlanTasks = (props) => {
    const [AddTaskButton, SetTaskButton] = useState(false);
    const [activePage, setActivepage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const getNewPage = (page) => {
        let curPage = currentPage;
        switch(page){
            case 'prev':
                if (curPage>1) {
                    setCurrentPage(currentPage-1);
                    curPage--;
                }
                break;
            case 'next': 
                if (curPage<Pagination.length){
                    setCurrentPage(currentPage+1);
                    curPage++;
                }
                break;
            default:
                setCurrentPage(page);
                curPage = page;
                break;  
        }
        props.TakeTasks(props.plan_id, curPage);
    }
    

    let AllTasks;
    if ( props.plantasks) {
        if (props.plantasks.length > 0){
        AllTasks = props.plantasks.map((x, key) => <Task plan_id = {props.plan_id} id = {x.id}
            role_id = {props.role_id}
            step = {props.step}
            date_start = {x.date_start}
            DeleteTaskFromEmployee = {props.DeleteTaskFromEmployee}
            key = {key} name = {x.name}
            date_end = {x.date_end} result = {x.result}
            content = {x.content} plan_id = {props.plan_id}
            TakeTasks = {props.TakeTasks}
            UpdateTaskStatusFromEmployee = {props.UpdateTaskStatusFromEmployee}
            UpdateTaskFromEmployee = {props.UpdateTaskFromEmployee}
            GetTaskAmount = {props.GetTaskAmount}
            />)
    }
    else AllTasks = "Задачи не добавлены"
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
                <div><AddTaskMode GetTaskAmount = {props.GetTaskAmount}
                    SetTaskButton={SetTaskButton} date_end = {props.date_end}
                    userName = {props.userName} plan_id = {props.plan_id}
                    CreatTaskForEmployee = {props.CreatTaskForEmployee}
                    TakeTasks = {props.TakeTasks} /></div> :
                ''
            }
            {(props.plantasks.length > 0)&&
            <div className = {s.PaginationContainer}>
                <img src = {previousPageArrow} alt='previous page' onClick={()=>getNewPage('prev')} />
                {Pagination.map((x,key) => <span className={key === activePage ? s.PaginationActive : s.Pagination}  onClick={() => getNewPage(x) }>{x}</span>)}
                <img src = {nextPageArrow} alt = "next page" onClick = {()=>getNewPage('next')} />
            </div>}
            <br />
        </div>
    )
}

export default PlanTasks