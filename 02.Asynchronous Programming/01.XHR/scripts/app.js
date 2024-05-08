function loadRepos() {

    const url = 'https://api.github.com/repos/testnakov/test-nakov-repo'
    const request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200)
            document.getElementById("response").innerHTML = this.responseText
    }

    request.open("GET", url, true)
    request.send()

}