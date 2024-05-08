import {html} from '../../node_modules/lit-html/lit-html.js'
import {createData} from '../api/data.js'

const createTemplate = (onSubmit) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Create Offer</h2>
            <form class="create-form" @submit=${onSubmit}>
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                ></textarea>
                <textarea
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        rows="4"
                        cols="50"
                ></textarea>
                <input
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                />

                <button type="submit">post</button>
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

        if (
            !data.title ||
            !data.imageUrl ||
            !data.category ||
            !data.description ||
            !data.requirements ||
            !data.salary
        ) {
            return
        }

        try {
            await createData(data)

            ctx.page.redirect('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
}
