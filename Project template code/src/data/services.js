import * as api from './api'

const endpoints = {
    movies: '/data/movies',
    likes: '/data/likes'
}

//TODO make the endpoints
export async function getAll() {
    return api.get(endpoints.movies)
}

//TODO make the endpoints
export async function getById(id) {
    return api.get(endpoints.movies + id)
}

//TODO make the endpoints
export async function create(data) {
    return api.post(endpoints.movies, data)
}

//TODO make the endpoints
export async function update(id, data) {
    return api.put(endpoints.movies + id, data)
}

//TODO make the endpoints
export async function del(id) {
    api.del(endpoints.movies + id)
}

export async function likeDataById(data) {
    return api.post(endpoints.likes, data)
}

export async function getAllLikesByDataId(movieId) {

    return api.get(
        `${endpoints.likes}?where=${encodeURIComponent(
            `albumId="${movieId}"`
        )}&distinct=_ownerId&count`
    )
}

export async function getAllLikesByDataIdAndUserId(movieId, userId) {

    const url = `${endpoints.likes}?where=${encodeURIComponent(
        `albumId="${movieId}"`
    )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;

    return api.get(
        `${endpoints.likes}?where=${encodeURIComponent(
            `albumId="${movieId}"`
        )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`
    )
}