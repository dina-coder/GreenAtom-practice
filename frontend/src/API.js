import * as axios from 'axios';

export const MainAPI = {
    login(email,password){
       let body= {
            email:email,
            password: password
          }
        
        return axios.post(`http://localhost:9000/api/login`, body)
        .then(response=>{return response.data})
    },
    takeData(user_id){ 
       return axios.get(`http://localhost:9000/api/get_plans_super?user_id=${user_id}&page=1`)
       .then(response=>{  return response.data})
   },
   getemployeeinfo(user_id){ 
     return axios.get(`http://localhost:9000/api/get_worker_data?user_id=${user_id}`)
     .then(response=>{  return response.data})
},
  taketask(plan_id){ 
    return axios.get(`http://localhost:9000/api/get_tasks?plan_id=${plan_id}`)
    .then(response=>{  return response.data})
  },
  takeplan_HR(){ 
    return axios.get(`http://localhost:9000/api/get_plans_hr?page=1`)
    .then(response=>{  return response.data})
  },
  deleteTask(id){ 
    console.log(id)
    axios.delete("http://localhost:9000/api/delete/task", { data: { id: id }})
    .then(response=>{  return response.data})
  },
  updateTaskStatus(id, result){ 
    console.log(id, result)
    axios.put("http://localhost:9000/api/update/task_result", { id: id, result: result})
    .then(response=>{ return response.data})
  }

}