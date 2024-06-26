import { displayView, updateNav } from './util.js';
import { homeView } from './home.js';

const section = document.getElementById('form-login');
const form = section.querySelector('.text-center.border.border-light.p-5');
form.addEventListener('submit', getData);

export function loginView() {
    displayView(section);
}

function getData(ev) {
    ev.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    loginUser(email, password);
}

async function loginUser(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
        alert(error.message);
        throw error;
    }

    homeView();
    updateNav();
}