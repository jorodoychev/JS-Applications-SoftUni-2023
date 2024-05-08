function attachEvents() {
    let loadBtn = document.getElementsByClassName('load')[0]
    let addBtn = document.getElementsByClassName('add')[0]
    let catchesDiv = document.getElementById('catches')
    let loginButton = document.getElementById('login')
    let logoutButton = document.getElementById('logout')
    let registerButton = document.getElementById('register')
    let spanEmail = document.querySelector('p.email span')
    let updateBtn = document.getElementsByClassName('update')[0]
    let deleteBtn = document.getElementsByClassName('delete')[0]
    updateBtn.disabled = true
    deleteBtn.disabled = true
    catchesDiv.replaceChildren()

    const baseURL = 'http://localhost:3030/data/catches'
    let accessToken = sessionStorage.getItem('accessToken')
    let userEmail = sessionStorage.getItem('email')
    let userId = sessionStorage.getItem('userId')

    if (accessToken) {
        loginButton.setAttribute('style', 'display:none')
        registerButton.setAttribute('style', 'display:none')
        spanEmail.textContent = userEmail
        addBtn.disabled = false
    } else {
        logoutButton.setAttribute('style', 'display:none')
    }

    loadBtn.addEventListener('click', () => {

        fetch(baseURL)
            .then(res => res.json())
            .then(data => {
                catchesDiv.replaceChildren()
                Object.keys(data).forEach(key => appendCatch(key, data))
            })
            .catch(error => console.error(error))
    })

    function appendCatch(key, data) {

        let {_ownerId, angler, weight, species, location, bait, captureTime, _id} = data[key]

        let catchDiv = createElement('div', 'catch', '')
        catchDiv.setAttribute('data-id', _ownerId)

        let anglerLabel = createElement('label', '', 'Angler')
        let anglerInput = createElement('input', 'angler', angler, 'text')
        anglerInput.disabled = true

        let weightLabel = createElement('label', '', 'Weight')
        let weightInput = createElement('input', 'weight', weight, 'number')
        weightInput.disabled =true

        let speciesLabel = createElement('label', '', 'Species')
        let speciesInput = createElement('input', 'species', species, 'text')
        speciesInput.disabled = true

        let locationLabel = createElement('label', '', 'Location')
        let locationInput = createElement('input', 'location', location, 'text')
        locationInput.disabled = true

        let baitLabel = createElement('label', '', 'Bait')
        let baitInput = createElement('input', 'bait', bait, 'text')
        baitInput.disabled = true

        let captureTimeLabel = createElement('label', '', 'Capture Time')
        let captureTimeInput = createElement('input', 'captureTime', captureTime, 'number')
        captureTimeInput.disabled = true

        let updateButton = createElement('button', 'update', 'Update')
        updateButton.disabled = true

        let deleteButton = createElement('button', 'delete', 'Delete')
        deleteButton.disabled = true


        if (catchDiv.getAttribute('data-id') === userId) {
            anglerInput.disabled = false
            weightInput.disabled =false
            speciesInput.disabled = false
            locationInput.disabled = false
            baitInput.disabled = false
            captureTimeInput.disabled = false
            deleteButton.disabled = false
            updateButton.disabled = false

            deleteButton.addEventListener('click', () => {
                let deleteURL = baseURL + `/${_id}`

                fetch(deleteURL, {
                    method: 'DELETE',
                    headers: {
                        'X-Authorization': accessToken
                    }
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
                catchDiv.remove()
            })

            updateButton.addEventListener('click', () => {

                let obj = JSON.stringify({
                        'angler': anglerInput.value,
                        'weight': weightInput.value,
                        'species': speciesInput.value,
                        'location': locationInput.value,
                        'bait': baitInput.value,
                        'captureTime': captureTimeInput.value
                    }
                )
                let updateURL = baseURL + `/${_id}`

                fetch(updateURL, {
                    method: 'PUT',
                    headers: {
                        'X-Authorization': accessToken
                    },
                    body: obj
                })

                    .then(res => res.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error))

            })
        }


        catchDiv.appendChild(anglerLabel)
        catchDiv.appendChild(anglerInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(weightLabel)
        catchDiv.appendChild(weightInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(speciesLabel)
        catchDiv.appendChild(speciesInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(locationLabel)
        catchDiv.appendChild(locationInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(baitLabel)
        catchDiv.appendChild(baitInput)
        catchDiv.appendChild(document.createElement('hr'))
        catchDiv.appendChild(captureTimeLabel)
        catchDiv.appendChild(captureTimeInput)

        catchDiv.appendChild(updateButton)
        catchDiv.appendChild(deleteButton)
        catchesDiv.appendChild(catchDiv)
    }

    addBtn.addEventListener('click', (e) => {
        e.preventDefault()

        let angler = document.querySelector('#addForm > fieldset > input.angler')
        let weight = document.querySelector('#addForm > fieldset > input.weight')
        let species = document.querySelector('#addForm > fieldset > input.species')
        let location = document.querySelector('#addForm > fieldset > input.location')
        let bait = document.querySelector('#addForm > fieldset > input.bait')
        let captureTime = document.querySelector('#addForm > fieldset > input.captureTime')

        if (angler.value === '' || weight.value === '' || species.value === '' || location.value === '' || bait.value === '' || captureTime.value === '') {
            return
        }

        let obj = JSON.stringify({
                'angler': angler.value,
                'weight': weight.value,
                'species': species.value,
                'location': location.value,
                'bait': bait.value,
                'captureTime': captureTime.value
            }
        )

        fetch(baseURL, {
            method: 'POST',
            headers: {
                'X-Authorization': accessToken
            },
            body: obj
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))

        document.getElementById('addForm').reset()

    })

    function createElement(el, classes, content, type) {
        let element = document.createElement(el)
        if (el === 'input') {
            element.type = type
            element.value = content
        } else {
            element.innerHTML = content
        }
        element.className = classes
        return element
    }

    async function logout() {
        const response = await fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: {
                'X-Authorization': accessToken
            },
        })
        sessionStorage.clear()
        window.location = 'index.html'
    }

    logoutButton.addEventListener('click', logout)


}

attachEvents()

