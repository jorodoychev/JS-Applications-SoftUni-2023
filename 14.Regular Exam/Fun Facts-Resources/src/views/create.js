import {html} from '../../node_modules/lit-html/lit-html.js'
import {createData} from '../api/data.js'

const createTemplate = (onSubmit) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onSubmit}>
                <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                />
                <input
                        type="text"
                        name="image-url"
                        id="image-url"
                        placeholder="Image URL"
                />
                <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                ></textarea>
                <textarea
                        id="additional-info"
                        name="additional-info"
                        placeholder="Additional Info"
                        rows="10"
                        cols="50"
                ></textarea>
                <button type="submit">Add Fact</button>
            </form>
        </div>
    </section>
`

export function showCreate(ctx) {

    ctx.render(createTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        function hasEmptyValues(obj) {
            for (const key in obj) {
                if (obj[key].trim() === '') {
                    return true
                }
            }
            return false
        }

        if (hasEmptyValues(data)) {
            return alert('Some inputs are empty.')
        }


        try {
            await createData(data)

            ctx.page.redirect('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
}
