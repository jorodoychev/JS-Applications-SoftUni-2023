function attachEvents() {
    const phonebookList = document.getElementById('phonebook')
    const btnLoad = document.getElementById('btnLoad')
    const btnCreate = document.getElementById('btnCreate')
    const name = document.getElementById('person')
    const phone = document.getElementById('phone')
    const baseUrl = 'http://localhost:3030/jsonstore/phonebook'

    btnLoad.addEventListener('click', loadPhonebook)
    btnCreate.addEventListener('click', createContact)


    async function createContact() {

        if (!name.value || !phone.value) {
            return
        }
        const data = {
            person: name.value.trim(),
            phone: phone.value.trim()
        }
        await fetch(baseUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })

        name.value = ''
        phone.value = ''
    }

    function removeContact(id) {
        const listItem = document.getElementById(id)
        listItem.parentElement.remove()
    }


    async function loadPhonebook() {
        phonebookList.replaceChildren()
        const response = await fetch(baseUrl)

        if (!response.ok) throw new Error(response.statusText)
        try {
            const data = await response.json()

            Object.values(data).forEach(({person, phone, _id}) => {
                const li = document.createElement('li')
                const btnDelete = document.createElement('button')
                btnDelete.textContent = 'Delete'
                btnDelete.setAttribute('id', _id)
                li.textContent = `${person}: ${phone}`
                li.appendChild(btnDelete)
                phonebookList.appendChild(li)
            })

            phonebookList.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    const contactId = e.target.getAttribute('id');
                    fetch(baseUrl + '/' + contactId, {
                        method: 'delete'
                    })
                        .then(() => removeContact(contactId))
                        .catch((error) => console.log(error))
                }

            })

        } catch (e) {
            console.log(e)
        }

    }

}

attachEvents();