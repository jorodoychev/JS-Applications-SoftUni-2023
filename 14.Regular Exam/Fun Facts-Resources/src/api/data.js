import * as api from './api.js'

export async function getAllData() {
    return api.get("/data/facts?sortBy=_createdOn%20desc")
}

export async function getDataById(id) {
    return api.get("/data/facts/" + id)
}

export async function createData(data) {
    return api.post("/data/facts", data)
}

export async function updateDataById(id, data) {
    return api.put("/data/facts/" + id, data)
}

export async function deleteDataById(id) {
    return api.del("/data/facts/" + id)
}

