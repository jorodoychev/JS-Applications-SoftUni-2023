import {html} from '../../node_modules/lit-html/lit-html.js'
import {getDataById, updateDataById} from '../api/data.js'

const editTemplate = (a, onEdit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${onEdit}>
                <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                        value=${a.category}
                />
                <input
                        type="text"
                        name="image-url"
                        id="image-url"
                        placeholder="Image URL"
                        value=${a.imageUrl}
                />
                <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        rows="10"
                        cols="50"
                >${a.description}</textarea>
                <textarea
                        id="additional-info"
                        name="additional-info"
                        placeholder="Additional Info"
                        rows="10"
                        cols="50"
                >${a.moreInfo}</textarea>
                <button type="submit">Post</button>
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
            await updateDataById(ctx.params.id, data)

            ctx.page.redirect('/details/' + ctx.params.id)
        } catch (err) {
            console.log(err.message)
        }
    }
}
