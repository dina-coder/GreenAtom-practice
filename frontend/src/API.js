import * as axios from 'axios';
import {Roles} from "./constants/roles";

export const MainAPI = {
  login(email, password) {
    let body = {
      email: email,
      password: password
    }

    return axios.post(`http://localhost:9000/api/login`, body)
      .then(response => {
        return response.data
      })
  },
  takeData(user_id, currentPage=1) {
    return axios.get(`http://localhost:9000/api/get_plans_super?user_id=${user_id}&page=${currentPage}`)
      .then(response => {
        return response.data
      })
  },
  getemployeeinfo(user_id) {
    return axios.get(`http://localhost:9000/api/get_worker_data?user_id=${user_id}`)
      .then(response => {
        return response.data
      })
  },
  taketask(plan_id, currentPage=1) {
    return axios.get(`http://localhost:9000/api/get_tasks?plan_id=${plan_id}&page=${currentPage}` )
      .then(response => {
        return response.data
      })
  },
  takeplan_HR(currentPage=1) {
    return axios.get(`http://localhost:9000/api/get_plans_hr?page=${currentPage}`)
      .then(response => {
        return response.data
      })
  },
  deleteTask(id) {
    console.log(id)
    axios.delete("http://localhost:9000/api/delete/task", { data: { id: id }})
    .then(response=>{  return response.data})
  },
  updateTaskStatus(id, result){ 
    console.log(id, result)
    axios.put("http://localhost:9000/api/update/task_result", { id: id, result: result})
    .then(response=>{ return response.data})
  },
  updateTask(plan_id, name, content, date_start, date_end, result, id){ 
    console.log(plan_id, name, content, date_start, date_end, result, id)
    axios.put("http://localhost:9000/api/update/task", { plan_id: plan_id, name: name, content: content, date_start:date_start, date_end: date_end, result:result, id:id})
    .then(response=>{ return response.data})
  },
  takeSteps(){
    return axios.get('http://localhost:9000/api/dict/steps')
      .then(response => {
        return response.data
      })
  },
  creactTasks(plan_id, name, content, date_start, date_end, result){ 
    console.log(plan_id, name, content, date_start, date_end, result)
    axios.post("http://localhost:9000/api/insert/task", { plan_id: plan_id, name: name, content: content, date_start:date_start, date_end: date_end, result:result})
    .then(response=>{ return response.data})
  },
  takeNames(role_id){
    return axios.get(`http://localhost:9000/api/dict/names?role_id=${role_id}`)
      .then(response => {
        return response.data
      })
  },
  takePositions(){
    return axios.get(`http://localhost:9000/api/dict/positions`)
      .then(response => {
        return response.data
      })
  },
  createPlan(worker_id, position_id, super_id, hr_id, date_start, date_end, result, grade_id){
    return axios.post("http://localhost:9000/api/insert/plan", { 
      worker_id: worker_id, 
      position_id: position_id, 
      super_id: super_id,
      hr_id: hr_id,
      date_start: date_start,
      date_end: date_end,
      result: result,
      grade_id: grade_id
    })
    .then(response=>{ return response.data }).catch(err=> { throw err.response.data})
  },
  updatePlanApi(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, id){ 
    console.log(worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, id)
    axios.put("http://localhost:9000/api/update/plan", { worker_id, position_id, super_id, hr_id, step_id, date_start, date_end, result, grade_id, id})
    .then(response=>{ return response.data})
  },
  gradesAPI(){
    return axios.get(`http://localhost:9000/api/dict/grades`)
      .then(response => {
        return response.data
      })
  },
  getAmountOfTasks(plan_id){
    return axios.get(`http://localhost:9000/api/count_tasks?plan_id=${plan_id}`)
    .then(response => {
      return response.data
    })
  },
  getAmountOfPlans(id){
    return axios.get(`http://localhost:9000/api/count_plans?id=${id}`)
    .then(response => {
      return response.data
    })
  },
  getAmountOfComments(plan_id){
    return axios.get(`http://localhost:9000/api/count_comments?plan_id=${plan_id}`)
    .then(response => {
      return response.data
    })
  },

  getFilteredList(role, stepValue, dateValue, nameValue, userId, page = 1,sort='-date_creation') {
    const rolesMapper = {
      [Roles.HR]: 'hr',
      [Roles.Director]: 'super',
    };
    const searchParams = new URLSearchParams();

    searchParams.append('page', `${page}`);
    if (role === Roles.Director) {
      searchParams.append('user_id', `${userId}`);

    }
    if (!!nameValue) {
      searchParams.append('filter_by', 'name');
      searchParams.append('name_filter', nameValue);
    }
    if (!!stepValue) {
      searchParams.append('filter_by', 'step');
      searchParams.append('step_filter', stepValue);
    }
    if (!!dateValue) {
      const period = dateValue.split("-");
      searchParams.append('filter_by', 'date');
      searchParams.append('sdate_filter', period[0]);
      searchParams.append('edate_filter', period[1]);
    }

    if (!searchParams.get('filter_by')) {
      searchParams.append('filter_by', 'none');
    }

    if(!!sort) {
      searchParams.append('sort',sort);
    }

    return axios.get(`http://localhost:9000/api/get_plans_${rolesMapper[role]}_filtered?${searchParams.toString()}`)
    .then(response => {
      return response.data
    })
  }, 
  getcomments(plan_id, page=1){
    return axios.get(`http://localhost:9000/api/get_comments?page=${page}&plan_id=${plan_id}`)
    .then(response => {
      return response.data
    })
  },
  postComment(content, plan_id, user_id){ 
    console.log(content, plan_id, user_id)
    axios.post("http://localhost:9000/api/insert/comment", { content, plan_id, user_id})
    .then(response=>{ return response.data})
  },
  getPdf(name){
    console.log(name)
   
    .then(response=>{ return response.data})
  }
  
 
}
export const  getPdf = async (name)=>{
  const x = await  axios.get(`http://localhost:9000/api/fetch_report?name=${name}`,{ responseType: 'blob' })
  return x.data
} 
export const createPdfFile = async(user_id)=>{ 
  console.log(user_id)
const x = await axios.post("http://localhost:9000/api/create_report", {user_id:user_id})
  return x.data
}