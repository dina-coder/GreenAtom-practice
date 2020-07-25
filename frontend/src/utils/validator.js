export const IsEmailCorrect=(value)=>{
    if ( /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)===false){
        return ('Введенный логин некорректен')
    }
}