import * as api from './api.js'

export async function getAllData() {
    return api.get("/data/albums?sortBy=_createdOn%20desc")
}

export async function getDataById(id) {
    return api.get("/data/albums/" + id)
}

export async function createData(data) {
    return api.post("/data/albums", data)
}

export async function updateDataById(id, data) {
    return api.put("/data/albums/" + id, data)
}

export async function deleteDataById(id) {
    return api.del("/data/albums/" + id)
}

export async function likeDataById(data) {
    return api.post("/data/likes", data)
}

export async function getAllLikesByDataId(albumId) {

    return api.get(
        `/data/likes?where=${encodeURIComponent(
            `albumId="${albumId}"`
        )}&distinct=_ownerId&count`
    )
}

export async function getAllLikesByDataIdAndUserId(albumId, userId) {

    const url = `/data/likes?where=${encodeURIComponent(
        `albumId="${albumId}"`
    )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`;

    return api.get(
        `/data/likes?where=${encodeURIComponent(
            `albumId="${albumId}"`
        )}%20and%20${encodeURIComponent(`_ownerId="${userId}"`)}&count`
    )
}
