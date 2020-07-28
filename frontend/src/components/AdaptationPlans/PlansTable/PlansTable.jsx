import React, { useState, useEffect } from 'react';
import greenArrow from '../../../img/down-arrow-green.png';
import rightArrow from '../../../img/right-arrow.png';
import previousPageArrow from '../../../img/previous-page.png';
import nextPageArrow from '../../../img/next-page.png';
import style from "./PlansTable.module.scss";
import Preloader from '../../Preloader/Preloader';
import AdaptationPlan from '../../AdaptationPlan/AdaptationPlan';



const PlansTable = (props) => {
    const [worker_id, setWorker_id] = useState(undefined);
    const [isPlanClick, setPlanClick] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [choosen, setChoosen] = useState('');
    const [sortDirection, setSortDirection] = useState('none');

    useEffect(()=>{
        props.onPageChange(currentPage, props.sort);
    },[currentPage]);
    const TakeDataForPlanClick = (bool,worker_id) => {
        setPlanClick(bool)
        setWorker_id(worker_id)
    }

    const setPrevPage=()=> {
        if (currentPage>1) {
            setCurrentPage(previous=> previous - 1);
        }
    } 
    const setNextPage = () => {
        if (currentPage<pagination.length){
            setCurrentPage(previous=> previous + 1);
        }
    }

    const isChoosen = (value) =>{
        if (choosen===value || choosen===('-'+value)) return true;
        return false;
    }

   const onSorting = (param) => {
        let sortBy= ''
        switch(sortDirection) {
            case "none":
                setSortDirection('down');
                sortBy = param;
                break;
            case 'down':
                setSortDirection('up');
                sortBy="-"+param;
                break;
            case 'up':
                setSortDirection('none');
                break;
        }
        setChoosen(sortBy);
        console.log(sortBy);
        props.onSort(currentPage,sortBy);
   }

    let pagination = [];
    const pagesAmount = Math.ceil(props.amount / 5);
    for (let i = 1; i <= pagesAmount; i++) {
        pagination.push(i);
    }
    return(
    <div>
        { props.arePlansExist(props.DataAboutPlans) ?
        <div className={style.container}>
        <table>
            <thead>
                <tr>
                    <th className={isChoosen('name') ? style.choosen : ''}
                        onClick={()=>onSorting('name')}
                    >
                        ФИО
                        <img src={ isChoosen('name') ? greenArrow : ''}
                             alt=""
                             style={sortDirection==='up' ?
                                 { transform:  'rotate(180deg)',
                                    marginBottom: '-3px'}
                                 :{}}

                        />
                    </th>
                    <th className={isChoosen('super') ? style.choosen : ''}
                        onClick={()=>onSorting('super')}
                    >
                        РУКОВОДИТЕЛЬ
                        <img src={ isChoosen('super') ? greenArrow : ''}
                             alt=""
                             style={sortDirection==='up' ?
                                 { transform:  'rotate(180deg)',
                                     marginBottom: '-3px'}
                                 :{}}

                        />
                    </th>
                    <th className={isChoosen('step_id') ? style.choosen : ''}
                        onClick={()=>onSorting('step_id')}
                    >
                        ЭТАП
                        <img src={ isChoosen('step_id') ? greenArrow : ''}
                             alt=""
                             style={sortDirection==='up' ?
                                 { transform:  'rotate(180deg)',
                                     marginBottom: '-3px'}
                                 :{}}

                        />
                    </th>
                    <th className={(isChoosen('date_start'))?style.choosen:''}
                        onClick={()=>onSorting('date_start')}
                    >
                        ПЕРИОД
                        <img src={ isChoosen('date_start') ? greenArrow : ''}
                             alt=""
                             style={sortDirection==='up' ?
                                 { transform:  'rotate(180deg)',
                                     marginBottom: '-3px'}
                                 :{}}

                        />
                    </th>
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody>
                { props.DataAboutPlans.map(x =>
                    <tr className = {style.plan} key={x.name+x.worker_id}>
                        <td>{x.name}</td>
                        <td>{x.super}</td>
                        <td>{x.step}</td>
                        <td>{x.date_start}&nbsp;-&nbsp;{x.date_end}</td>
                        <td><button className = {style.planButton}
                         onClick = {()=>TakeDataForPlanClick(true,x.worker_id)}> Перейти  <img src = {rightArrow} alt = ""></img>
                         </button></td>
                    </tr> 
                    )
                }
           
            </tbody>
        </table>
            {props.isFetching&&<Preloader />}
            <div className={style.paginationContainer}>
            <img src={previousPageArrow} alt='previous page' onClick={setPrevPage} />
            {pagination.map((x) => <span key={x} className={x===currentPage ? style.active : style.pagination} onClick={() => setCurrentPage(x) }>{x}</span>)}
            <img src={nextPageArrow} alt="next page" onClick={setNextPage} />
            </div>
        </div>
        : <div style={{
            fontSize:'26px',
            textAlign: 'center',
            marginTop: '20px',
            color:'rgba(90, 90, 93, 0.7)'}}
        > Планов нет </div>
        }
                {isPlanClick && <AdaptationPlan
                worker_id = {worker_id}
                sort={props.sort}
                page={currentPage}
                setPlanClick = {setPlanClick} />}

    </div> 
            
    )
            
}

export default PlansTable;