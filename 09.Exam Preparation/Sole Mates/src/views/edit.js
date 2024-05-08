import {html} from '../../node_modules/lit-html/lit-html.js'
import {getDataById, updateDataById} from '../api/data.js'

const editTemplate = (a, onEdit) => html`
    <!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onEdit}>
                <input
                        type="text"
                        name="brand"
                        id="shoe-brand"
                        placeholder="Brand"
                        value=${a.brand}
                />
                <input
                        type="text"
                        name="model"
                        id="shoe-model"
                        placeholder="Model"
                        value=${a.model}
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="shoe-img"
                        placeholder="Image url"
                        value=${a.imageUrl}
                />
                <input
                        type="text"
                        name="release"
                        id="shoe-release"
                        placeholder="Release date"
                        value=${a.release}
                />
                <input
                        type="text"
                        name="designer"
                        id="shoe-designer"
                        placeholder="Designer"
                        value=${a.designer}
                />
                <input
                        type="text"
                        name="value"
                        id="shoe-value"
                        placeholder="Value"
                        value=${a.value}
                />

                <button type="submit">post</button>
            </form>
        </div>
    </section>
`

export async function showEdit(ctx) {

    const shoe = await getDataById(ctx.params.id)

    ctx.render(editTemplate(shoe, onEdit))

    async function onEdit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)

        if (
            !data.brand ||
            !data.model ||
            !data.release ||
            !data.imageUrl ||
            !data.designer ||
            !data.value
        ) {
            return
        }

        try {
            await updateDataById(ctx.params.id, data)

            ctx.page.redirect('/details/' + ctx.params.id)
        } catch (err) {
            console.log(err.message);
        }
    }
}
