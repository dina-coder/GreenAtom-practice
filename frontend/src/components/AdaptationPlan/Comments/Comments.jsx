import React, { useState } from 'react'
import s from './Comments.module.scss'
import Comment from './Comment/Comment'
import TopPanelWithCreate from '../../TopPanelWithCreate/TopPanelWithCreate';
import send from '../../../img/send 1.png'
import errorImg from '../../../img/error.png'
import previousPageArrow from '../../../img/previous-page.png';
import nextPageArrow from '../../../img/next-page.png';


const Comments = (props) => {
    const [isError, setError] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [activePage, setActivepage] = useState(null);
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
        props.GetComments(props.plan_id, curPage);
    }
    let AllComments;
    if (props.comments.length > 0) {
        AllComments = props.comments.map((x, key) => <Comment name={x.name} role={x.role} content={x.content} date_creation={x.date_creation} />)
    } else AllComments = "Нет комментариев"
    let Pagination = [];
    let PagesAmount = Math.ceil(props.amountOfComments / 5);
    for (let i = 1; i <= PagesAmount; i++) {
        Pagination.push(i);
    }
    return (
        <div className={s.Container}>
            <TopPanelWithCreate title="Комментарии" amount={props.amountOfComments} />
            <div className={s.InnerContainer}>
                {typeof(AllComments)==='string'
                    ? <p style={{padding:'10px'}}>{AllComments}</p>
                    : AllComments}
                {(props.comments.length > 0)&&
                <div className = {s.PaginationContainer}>
                <img src = {previousPageArrow} alt='previous page' onClick={()=>getNewPage('prev')} />
                {Pagination.map((x,key) => <span className={key === activePage ? s.PaginationActive : s.Pagination}  onClick={() => getNewPage(x) }>{x}</span>)}
                <img src = {nextPageArrow} alt = "next page" onClick = {()=>getNewPage('next')} />
                </div>}
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