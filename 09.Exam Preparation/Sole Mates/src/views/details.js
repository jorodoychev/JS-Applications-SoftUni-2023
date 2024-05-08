import {html, nothing} from '../../node_modules/lit-html/lit-html.js'
import {
    deleteDataById,
    getDataById,
} from '../api/data.js'

const detailsTemplate = (a, user, onDelete) => {
    const isCreator = a._ownerId === user?._id

    return html`
        <!-- Details page -->
        <section id="details">
            <div id="details-wrapper">
                <p id="details-title">Shoe Details</p>
                <div id="img-wrapper">
                    <img src="${a.imageUrl}" alt="example1"/>
                </div>
                <div id="info-wrapper">
                    <p>Brand: <span id="details-brand">${a.brand}</span></p>
                    <p>
                        Model: <span id="details-model">${a.model}</span>
                    </p>
                    <p>Release date: <span id="details-release">${a.release}</span></p>
                    <p>Designer: <span id="details-designer">${a.designer}</span></p>
                    <p>Value: <span id="details-value">${a.value}</span></p>
                </div>

                ${user
                        ? html`
                            <div id="action-buttons">
                                ${isCreator
                                        ? html`
                                            <a href="/edit/${a._id}" id="edit-btn">Edit</a>
                                            <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                                        `
                                        : nothing}
                            </div>
                        `
                        : nothing}
            </div>
        </section>
    `

}

export async function showDetails(ctx) {

    const shoeId = ctx.params.id

    const shoe = await getDataById(shoeId)


    ctx.render(
        detailsTemplate(shoe, ctx.user, onDelete)
    )


    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this shoe?')
        if (confirmed){
            try {
                await deleteDataById(shoeId)

                ctx.page.redirect("/dashboard")
            } catch (err) {
                console.log(err.message)
            }
        }

    }
}
