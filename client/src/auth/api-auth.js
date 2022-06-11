import baseUrl from '../config/config'

const signin = user => {
    return fetch(`${baseUrl}/auth/signin`,{
        method:'POST',
        headers:{
            'Accept':'appliation/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user),
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

const signout = () => {
    return fetch(`${baseUrl}/auth/signout`, {method:'GET'})
    .then(response=>response.json())
    .catch(err=>console.log(err))
}

export {signin, signout}