async function loadRepos() {
    const output = document.getElementById('repos')
    const username = document.getElementById('username').value

    const url = `https://api.github.com/users/${username}/repos`

    // fetch(url).then(response=>{
    // 	if (response.ok === false){
    // 		console.log('Error:', response.status, response.statusText)
    // 		output.innerHTML = `<p>${response.status}: ${response.statusText}</p>`
    // 	} else {
    // 		return response.json()
    // 	}
    // }).then(data=>{
    // 	output.replaceChildren()
    // 	for (let entry of data) {
    // 		const li = document.createElement('li')
    // 		li.innerHTML = `<a href="${entry.html_url}">${entry.full_name}</a>`
    // 		output.appendChild(li)
    // 	}
    // }).catch((error=>{
    // 	console.log(error.message)
    // 	output.innerHTML = `<p>${error.message}</p>`
    // }))


    try {
        const response = await fetch(url)
        if (response.ok === false) {
            console.log('Error:', response.status, response.statusText)
            const error = await response.json()
            throw error
        }

        const data = await response.json()
		
        output.replaceChildren()
        for (let entry of data) {
            const li = document.createElement('li')
            li.innerHTML = `<a href="${entry.html_url}">${entry.full_name}</a>`
            output.appendChild(li)
        }

    } catch (error) {
        output.innerHTML = `<p>${error.message}</p>`
    }

}