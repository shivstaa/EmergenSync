

export function SetToken(user, accessToken){

    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(user))

}


export function DeleteToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')

}

export function getToken(){
    return localStorage.getItem('token')
}

export function getUserAuth(){
    return JSON.parse(localStorage.getItem('user'))
}