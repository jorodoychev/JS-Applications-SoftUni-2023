import {html} from '../../node_modules/lit-html/lit-html.js'
import {getAllData} from '../api/data.js'

const dashboardTemplate = (shoes) => html`
    <!-- Dashboard page -->
    <section id="dashboard">
        <h2>Collectibles</h2>
        ${shoes.length !== 0
                ? html`
                    <ul class="card-wrapper">
                        ${shoes.map(
                                (a) => html`
                                    <li class="card">
                                        <img src="${a.imageUrl}" alt="travis"/>
                                        <p>
                                            <strong>Brand: </strong><span class="brand">${a.brand}</span>
                                        </p>
                                        <p>
                                            <strong>Model: </strong
                                            ><span class="model">${a.model}</span>
                                        </p>
                                        <p><strong>Value:</strong><span class="value">${a.value}</span>$</p>
                                        <a class="details-btn" href="/details/${a._id}">Details</a>
                                    </li>
                                `
                        )}
                    </ul>
                `
                : html` <h2>There are no items added yet.</h2> `}
    </section>
`

export async function showDashboard(ctx) {

    const shoes = await getAllData()

    ctx.render(dashboardTemplate(shoes))
}
