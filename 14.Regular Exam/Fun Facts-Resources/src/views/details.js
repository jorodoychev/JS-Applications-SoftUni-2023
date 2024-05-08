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
                <p id="details-category">${a.category}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p id="description">${a.description}</p>
                        <p id="more-info">${a.moreInfo}</p>
                    </div>

                    <h3>Likes:<span id="likes">0</span></h3>

                    <!--Edit and Delete are only for creator-->
                    ${user
                            ? html`
                                <div id="action-buttons">
                                    ${isCreator
                                            ? html`
                                                <a href="/edit/${a._id}" id="edit-btn">Edit</a>
                                                <a href="javascript:void(0)" id="delete-btn"
                                                   @click=${onDelete}>Delete</a>
                                            `
                                            : html`
                                                <!--Bonus - Only for logged-in users ( not authors )-->
                                                <a href="javascript:void(0)" id="like-btn">Like</a>`}

                                </div>`
                            : nothing}
                </div>
            </div>
        </section>
    `
}

export async function showDetails(ctx) {

    const factId = ctx.params.id

    const fact = await getDataById(factId)


    ctx.render(
        detailsTemplate(fact, ctx.user, onDelete)
    )


    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete this fact?')
        if (confirmed) {
            try {
                await deleteDataById(factId)

                ctx.page.redirect("/dashboard")
            } catch (err) {
                console.log(err.message)
            }
        }

    }
}
