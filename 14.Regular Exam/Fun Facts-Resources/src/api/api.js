import {getUserData} from '../utils.js'
const baseUrl = 'http://localhost:3030'

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data) {
        options.headers["Content-Type"] = "application/json"
        options.body = JSON.stringify(data)
    }

    const user = getUserData()

    if (user) {
        options.headers["X-Authorization"] = user.accessToken
    }

    try {
        const response = await fetch(baseUrl + url, options)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return response.json()

    } catch (err) {
        alert(err.message)
        throw err
    }
}

export const get = request.bind(null, 'GET')
export const post = request.bind(null, 'POST')
export const put = request.bind(null, 'PUT')
export const del = request.bind(null, 'DELETE')
