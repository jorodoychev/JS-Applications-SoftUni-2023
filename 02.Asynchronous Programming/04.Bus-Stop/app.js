async function getInfo() {
    const stopId = document.getElementById('stopId').value
    const stopName = document.getElementById('stopName')
    const ulBuses = document.getElementById('buses')
    ulBuses.innerHTML = ''

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`

    try {
        const response = await fetch(url)

        if (response.ok === false) {
            let error = new Error()
            error.status = response.status
            error.statusText = response.statusText
            throw error
        }

        const data = await response.json()
        stopName.textContent = data.name
        
        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li')
            li.textContent = `Bus ${busId} arrives in ${time} minutes`
            ulBuses.appendChild(li)
        })


    } catch (error) {
        stopName.textContent = 'Error'
    }


}