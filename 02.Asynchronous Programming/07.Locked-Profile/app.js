async function lockedProfile() {
    const response = await fetch(
        "http://localhost:3030/jsonstore/advanced/profiles"
    );
    const data = await response.json();

    const main = document.getElementById("main");
    const profile = document.querySelector(".profile");

    Object.values(data).forEach(({ username, email, age }) => {
        let userValue = profile.querySelector('input[name="user1Username"]');
        let emailValue = profile.querySelector('input[name="user1Email"]');
        let ageValue = profile.querySelector('input[name="user1Age"]');

        userValue.value = username;
        emailValue.value = email;
        emailValue.type = "email";
        ageValue.value = age;
        ageValue.type = "email";
        main.appendChild(profile.cloneNode(true));
    });
    const hideIt = [...main.querySelectorAll('div[class="user1Username"]')];
    hideIt.forEach((div) => {
        div.style.display = "none";
        div.className = "";
        div.id = "user1HiddenFields";
    });
    const btns = main.querySelectorAll("button");
    btns.forEach((b) => {
        b.addEventListener("click", (e) => {
            if (
                e.target.textContent === "Show more" &&
                e.target.parentElement.querySelector('input[value="lock"]').checked ===
                false
            ) {
                e.target.parentElement.querySelector(
                    'div[id="user1HiddenFields"]'
                ).style.display = "block";
                e.target.textContent = "Hide it";
            } else if (
                e.target.textContent === "Hide it" &&
                e.target.parentElement.querySelector('input[value="lock"]').checked ===
                false
            ) {
                e.target.parentElement.querySelector(
                    'div[id="user1HiddenFields"]'
                ).style.display = "none";
                e.target.textContent = "Show more";
            }
        });
    });
    main.children[0].remove();
}