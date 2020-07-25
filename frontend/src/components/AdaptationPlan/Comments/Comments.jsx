import React, { useState } from 'react'
import s from './Comments.module.scss'
import Comment from './Comment/Comment'
import TopPanelWithCreate from '../../TopPanelWithCreate/TopPanelWithCreate';
import send from '../../../img/send 1.png'
import errorImg from '../../../img/error.png'


const Comments = (props) => {
    const [isError, setError] = useState(false)
    const [commentContent, setComment] = useState("");
    const SendComment =(content, plan_id, user_id)=>{
        if (content === ''){
            setError(true)
        }
        else {
            props.PostComment(content, plan_id, user_id)
            .then(()=> props.GetComments(plan_id))
            setComment("");
        }
        }
    
    const NewCommentText = (e) => {
        setComment(e.currentTarget.value);
    }
    let AllComments;
    if (props.comments.length > 0) {
        AllComments = props.comments.map((x, key) => <Comment name={x.name} role={x.role} content={x.content} date_creation={x.date_creation} />)
    } else AllComments = "Нет комментариев"

    //     let AllTasks;
    //     if ( props.plantasks) {
    //         if (props.plantasks.length > 0){
    //         AllTasks = props.plantasks.map((x, key) => <Task plan_id = {props.plan_id} id = {x.id}
    //             role_id = {props.role_id}
    //             step = {props.step}
    //             date_start = {x.date_start}
    //             DeleteTaskFromEmployee = {props.DeleteTaskFromEmployee}
    //             key = {key} name = {x.name}
    //             date_end = {x.date_end} result = {x.result}
    //             content = {x.content} plan_id = {props.plan_id}
    //             TakeTasks = {props.TakeTasks}
    //             UpdateTaskStatusFromEmployee = {props.UpdateTaskStatusFromEmployee}
    //             UpdateTaskFromEmployee = {props.UpdateTaskFromEmployee}
    //             GetTaskAmount = {props.GetTaskAmount}
    //             />)
    //     }
    //     else AllTasks = "Задачи не добавлены"
    // }
    //     else AllTasks = "Задачи не добавлены"
    //     let Pagination = [];
    //     let PagesAmount = Math.ceil(props.amountOfTask / 5);
    //     for (let i = 1; i <= PagesAmount; i++) {
    //         Pagination.push(i);
    //     }
    return (
        <div className={s.Container}>
            <TopPanelWithCreate title="Комментарии" amount="1" />
            <div className={s.InnerContainer}>
                {AllComments}
                <div className={s.TextBoxContainer}>
                    <input  onChange = {NewCommentText} value = {commentContent} placeholder="Оставить комментарий..." className={isError === false ? s.Input : s.ErrorBorder} />
                    <div className={s.SendButton}>
                        <img onClick={()=>SendComment(commentContent, props.plan_id, props.user_id)}  src={send} />
                    </div>
                    {isError ? <h3 className={s.Error}><img className={s.ErrorImg} src ={errorImg} alt={""}/> Введите комментарий!</h3>: ''}
                </div>
            </div>
        </div>
    )
}

export default Comments