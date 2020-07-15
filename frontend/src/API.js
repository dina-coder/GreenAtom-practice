import * as axios from 'axios';

export const MainAPI = {
    login(email,password){
       let body= JSON.stringify({
            email:email,
            password: password
          })
          console.log(body)
        return axios.post(`http://localhost:9000/api/login`, body,
        ).then(response=>{return response.data})
    }
}