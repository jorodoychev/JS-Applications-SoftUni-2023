function students() {
    const baseURL = 'http://localhost:3030/jsonstore/collections/students'
    const tbody = document.querySelector('table#results tbody')
    const form = document.getElementById('form')
    const firstName = document.getElementsByName('firstName')[0]
    const lastName = document.getElementsByName('lastName')[0]
    const facultyNumber = document.getElementsByName('facultyNumber')[0]
    const grade = document.getElementsByName('grade')[0]


    async function loadStudents() {
        tbody.replaceChildren()
        const response = await fetch(baseURL)

        if (!response.ok) throw new Error(response.statusText)

        try {
            const data = await response.json()

            Object.values(data).forEach(({firstName, lastName, facultyNumber, grade, _id}) => {
                const tr = document.createElement('tr')
                const firstNameTd = document.createElement('td')
                firstNameTd.textContent = firstName
                tr.appendChild(firstNameTd)

                const lastNameTd = document.createElement('td')
                lastNameTd.textContent = lastName
                tr.appendChild(lastNameTd)

                const facultyNumberTd = document.createElement('td')
                facultyNumberTd.textContent = facultyNumber
                tr.appendChild(facultyNumberTd)

                const gradeTd = document.createElement('td')
                gradeTd.textContent = grade
                tr.appendChild(gradeTd)

                tbody.appendChild(tr)
            })
        } catch (e) {
            console.error(e)
        }


    }

    document.querySelector('form').addEventListener('submit', createStudent)

    async function createStudent(e) {
        e.preventDefault()

        if (!firstName.value || !lastName.value || !facultyNumber.value || !grade.value) {
            return
        }


        const formData = new FormData(form)
        const studentData = {}

        formData.forEach((value, key) => {
            studentData[key] = value
        })


        try {

            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            })

            if (!response.ok) throw new Error(response.statusText)


        } catch (e) {
            console.error(e)
        }

        await loadStudents()

    }


    window.onload = loadStudents


}

students()