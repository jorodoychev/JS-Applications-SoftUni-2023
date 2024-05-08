import {html} from '../../node_modules/lit-html/lit-html.js'
import {register} from '../api/auth.js'

const registerTemplate = (onRegister) => html`
    <!-- Register Page (Only for Guest users) -->
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form class="register-form" @submit=${onRegister}>
                <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
                />
                <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                />
                <input
                        type="password"
                        name="re-password"
                        id="repeat-password"
                        placeholder="repeat password"
                />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>
`

export function showRegister(ctx) {

    ctx.render(registerTemplate(onRegister))

    async function onRegister(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        if (!data.email || !data.password) {
            return alert('All fields are required')
        }

        if(data.password !== data['re-password']){
            return alert('Password don\'t match')
        }

        try {
            await register(data.email, data.password)
            form.reset()

            ctx.page.redirect('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
}
