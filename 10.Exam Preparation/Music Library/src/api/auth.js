import {clearUserData, setUserData} from '../utils.js'
import {get, post} from './api.js'

export async function login(email, password) {
    const response = await post('/users/login', {email, password})

    setUserData(response)

    return response
}

export async function register(email, password) {
    const response = await post('/users/register', {email, password})

    setUserData(response)

    return response
}

export async function logout() {
    get('/users/logout')

    clearUserData()
}
