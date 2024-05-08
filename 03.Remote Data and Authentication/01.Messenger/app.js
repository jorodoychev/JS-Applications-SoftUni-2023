function attachEvents() {
    const textarea = document.getElementById('messages')
    const getMessages = document.getElementById('refresh')
    const sendMessage = document.getElementById('submit')
    const authorName = document.getElementsByName('author')[0]
    const msgText = document.getElementsByName('content')[0]
    const baseURL = 'http://localhost:3030/jsonstore/messenger'


    getMessages.addEventListener('click', getAllMessages)
    sendMessage.addEventListener('click', sendMessages)

    async function getAllMessages() {
        textarea.textContent = ''
        try {
            const response = await fetch(baseURL)

            if (response.ok === false) {
                throw new Error(response.statusText)
            }

            const data = await response.json()
            const allMsg = []

            Object.values(data).forEach(({author, content}) => {
                allMsg.push(`${author}: ${content}`)
            })

            textarea.textContent = allMsg.join('\n')


        } catch (e) {
            console.log(e)
        }

    }

    async function sendMessages() {
        if (authorName.value === "" || msgText.value === "") {
            return
        }
        const data = {
            author: authorName.value,
            content: msgText.value
        }

        await fetch(baseURL, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        authorName.value = ''
        msgText.value = ''
    }
}

attachEvents();