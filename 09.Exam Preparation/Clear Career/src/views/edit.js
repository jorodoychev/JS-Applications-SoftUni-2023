import {html} from '../../node_modules/lit-html/lit-html.js'
import {getDataById, updateDataById} from '../api/data.js'

const editTemplate = (a, onEdit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form" @submit=${onEdit}>
                <input
                        type="text"
                        name="title"
                        id="job-title"
                        placeholder="Title"
                        value=${a.title}
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="job-logo"
                        placeholder="Company logo url"
                        value=${a.imageUrl}
                />
                <input
                        type="text"
                        name="category"
                        id="job-category"
                        placeholder="Category"
                        value=${a.category}
                />
                <textarea
                        id="job-description"
                        name="description"
                        placeholder="Description"
                        rows="4"
                        cols="50"
                >${a.description}</textarea>
                <textarea
                        id="job-requirements"
                        name="requirements"
                        placeholder="Requirements"
                        rows="4"
                        cols="50"
                >${a.requirements}</textarea>
                <input
                        type="text"
                        name="salary"
                        id="job-salary"
                        placeholder="Salary"
                        value=${a.salary}
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`

export async function showEdit(ctx) {

    const offer = await getDataById(ctx.params.id)

    ctx.render(editTemplate(offer, onEdit))

    async function onEdit(event) {
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
            return alert("All fields are required!")
        }

        try {
            await updateDataById(ctx.params.id, data)

            ctx.page.redirect('/details/' + ctx.params.id)
        } catch (err) {
            console.log(err.message)
        }
    }
}
