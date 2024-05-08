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
                <img id="details-img" src="${a.imageUrl}" alt="example1"/>
                <p id="details-title">${a.title}</p>
                <p id="details-category">
                    Category: <span id="categories">${a.category}</span>
                </p>
                <p id="details-salary">
                    Salary: <span id="salary-number">${a.salary}</span>
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description</h4>
                        <span>${a.description}</span>
                    </div>
                    <div id="details-requirements">
                        <h4>Requirements</h4>
                        <span>${a.requirements}</span>
                    </div>
                </div>
                <p>Applications: <strong id="applications">1</strong></p>

                <!--Edit and Delete are only for creator-->
                ${user
                        ? html`
                            <div id="action-buttons">
                                ${isCreator
                                        ? html`
                                            <a href="/edit/${a._id}" id="edit-btn">Edit</a>
                                            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
                                        `
                                        : html`
                                            <a href="javascript:void(0)" id="apply-btn">Apply</a>`}
                            </div>`
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
        const confirmed = confirm('Are you sure you want to delete this?')
        if (confirmed) {
            try {
                await deleteDataById(shoeId)

                ctx.page.redirect("/dashboard")
            } catch (err) {
                console.log(err.message)
            }
        }

    }
}
