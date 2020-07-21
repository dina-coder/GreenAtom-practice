export const formatDate = (date)=>{
    return  +new Date(date.split('.').reverse().join('.'));
  }