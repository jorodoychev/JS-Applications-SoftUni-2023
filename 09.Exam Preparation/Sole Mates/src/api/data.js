import * as api from './api.js'

export async function getAllData() {
    return api.get("/data/shoes?sortBy=_createdOn%20desc")
}

export async function getDataById(id) {
    return api.get("/data/shoes/" + id)
}

export async function createData(data) {
    return api.post("/data/shoes", data)
}

export async function updateDataById(id, data) {
    return api.put("/data/shoes/" + id, data)
}

export async function deleteDataById(id) {
    return api.del("/data/shoes/" + id)
}

