import {html} from '../../node_modules/lit-html/lit-html.js'
import {createData} from '../api/data.js'

const createTemplate = (onSubmit) => html`
    <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${onSubmit}>
                <input
                        type="text"
                        name="brand"
                        id="shoe-brand"
                        placeholder="Brand"
                />
                <input
                        type="text"
                        name="model"
                        id="shoe-model"
                        placeholder="Model"
                />
                <input
                        type="text"
                        name="imageUrl"
                        id="shoe-img"
                        placeholder="Image url"
                />
                <input
                        type="text"
                        name="release"
                        id="shoe-release"
                        placeholder="Release date"
                />
                <input
                        type="text"
                        name="designer"
                        id="shoe-designer"
                        placeholder="Designer"
                />
                <input
                        type="text"
                        name="value"
                        id="shoe-value"
                        placeholder="Value"
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
            await createData(data)

            ctx.page.redirect('/dashboard')
        } catch (err) {
            console.log(err.message)
        }
    }
}
