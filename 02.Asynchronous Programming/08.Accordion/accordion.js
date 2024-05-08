window.onload = solution

async function solution() {
    try {
        const response = await fetch(
            "http://localhost:3030/jsonstore/advanced/articles/list"
        );

        if (response.ok === false) {
            const error = new Error()
            error.status = response.status
            error.statusText = response.statusText
            throw error
        }

        let data = await response.json();
        let main = document.getElementById("main")

        for (const {_id, title} of Object.values(data)) {
            const detailsResponse = await fetch(
                `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`
            );
            const detailsData = await detailsResponse.json()
            const newAccordion = document.createElement("div")
            newAccordion.innerHTML = `
    <div class="accordion">
            <div class="head">
                <span>${title}</span>
                <button class="button" id="${_id}">More</button>
            </div>
            <div class="extra">
                <p>${detailsData.content}</p>
            </div>
    </div>
    `;
            main.appendChild(newAccordion);
            const currentBtn = document.getElementById(`${_id}`)
            currentBtn.addEventListener("click", expand)
        }

    } catch (e) {
        console.log(e.message)
    }


    function expand(event) {
        const btn = event.target;
        const accordion = btn.parentElement.parentElement;
        const extraContent = accordion.querySelector(".extra")

        if (btn.textContent === "More") {
            btn.textContent = "Less";
            extraContent.style.display = "block"
        } else {
            btn.textContent = "More";
            extraContent.style.display = "none"
        }
    }
}





