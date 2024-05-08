import {html} from '../../node_modules/lit-html/lit-html.js'
import {getAllData} from '../api/data.js'

const dashboardTemplate = (data) => html`
    <!-- Dashboard page -->
    <h2>Fun Facts</h2>
    <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
         ${data.length !== 0
    ? html`
        ${data.map(
                (a) => html`
                    <div class="fact">
                        <img src="${a.imageUrl}" alt="example1"/>
                        <h3 class="category">${a.category}</h3>
                        <p class="description">${a.description}</p>
                        <a class="details-btn" href="/details/${a._id}">More Info</a>
                    </div>
                `
        )}
        `
        : html`<h2>No Fun Facts yet.</h2>`}
    </section>
`

export async function showDashboard(ctx) {

    const data = await getAllData()

    ctx.render(dashboardTemplate(data))
}
