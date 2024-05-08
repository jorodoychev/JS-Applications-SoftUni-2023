import * as api from './api.js'

export async function getAllData() {
    return api.get("/data/offers?sortBy=_createdOn%20desc")
}

export async function getDataById(id) {
    return api.get("/data/offers/" + id)
}

export async function createData(data) {
    return api.post("/data/offers", data)
}

export async function updateDataById(id, data) {
    return api.put("/data/offers/" + id, data)
}

export async function deleteDataById(id) {
    return api.del("/data/offers/" + id)
}

