import {html, nothing} from '../../node_modules/lit-html/lit-html.js'
import {
    deleteDataById,
    getDataById,
    getAllLikesByDataId,
    getAllLikesByDataIdAndUserId,
    likeDataById,
} from '../api/data.js'

const detailsTemplate = (a, likes, user, isAlreadyLiked, onDelete, onLike) => {
    const isCreator = a._ownerId === user?._id

    return html`
        <section id="details">
            <div id="details-wrapper">
                <p id="details-title">Album Details</p>
                <div id="img-wrapper">
                    <img src="${a.imageUrl}" alt="example1"/>
                </div>
                <div id="info-wrapper">
                    <p>
                        <strong>Band:</strong><span id="details-singer">${a.singer}</span>
                    </p>
                    <p>
                        <strong>Album name:</strong
                        ><span id="details-album">${a.album}</span>
                    </p>
                    <p>
                        <strong>Release date:</strong
                        ><span id="details-release">${a.release}</span>
                    </p>
                    <p>
                        <strong>Label:</strong><span id="details-label">${a.label}</span>
                    </p>
                    <p>
                        <strong>Sales:</strong><span id="details-sales">${a.sales}</span>
                    </p>
                </div>
                <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

                <!--Edit and Delete are only for creator-->
                ${user
                        ? html`
                            <div id="action-buttons">
                                ${!isCreator && !isAlreadyLiked
                                        ? html`<a href="" id="like-btn" @click=${onLike}>Like</a>`
                                        : nothing}
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

    const albumId = ctx.params.id

    const album = await getDataById(albumId)

    const likes = await getAllLikesByDataId(albumId)

    let isAlreadyLiked = false;

    if (ctx.user) {
        isAlreadyLiked = !!(await getAllLikesByDataIdAndUserId(
            albumId,
            ctx.user._id
        ))
    }

    ctx.render(
        detailsTemplate(album, likes, ctx.user, isAlreadyLiked, onDelete, onLike)
    )

    async function onLike() {
        try {
            await likeDataById({albumId: album._id})

            ctx.page.redirect('/details/' + albumId)
        } catch (err) {
            console.log(err.message);
        }
    }

    async function onDelete() {
        try {
            await deleteDataById(albumId)

            ctx.page.redirect("/dashboard")
        } catch (err) {
            console.log(err.message)
        }
    }
}
