async function loadCommits() {
    const ul = document.getElementById('commits')
    const username = document.getElementById('username').value
    const repository = document.getElementById('repo').value
    const url = `https://api.github.com/repos/${username}/${repository}/commits`

    try {
        const response = await fetch(url)

        if (response.ok === false) {
            console.log(response.statusText)
            const error = await response.json()
            throw error
        }

        const data = await response.json()

        ul.replaceChildren()

        for (let el of data) {
            const li = document.createElement('li')
            li.textContent = el.commit.author.name + ': ' + el.commit.message
            ul.appendChild(li)
        }


    } catch (e) {
        ul.innerHTML = `<li>${e.message}</li>`
    }


}