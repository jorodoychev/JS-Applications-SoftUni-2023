import {html} from '../../node_modules/lit-html/lit-html.js'
import {getAllData} from '../api/data.js'

const dashboardTemplate = (data) => html`
    <!-- Dashboard page -->
    <section id="dashboard">
        <h2>Job Offers</h2>
        <!-- Display a div with information about every post (if any)-->
         ${data.length !== 0
    ? html`
        ${data.map(
                (a) => html`
                    <div class="offer">
                    <img src="${a.imageUrl}" alt="example1"/>
                    <p>
                        <strong>Title: </strong><span class="title">${a.title}</span>
                    </p>
                    <p><strong>Salary:</strong><span class="salary">${a.salary}</span></p>
                    <a class="details-btn" href="/details/${a._id}">Details</a>
                    </div>
                `
        )}
        `
        : html` <h2>No offers yet.</h2>`}
    </section>
`

export async function showDashboard(ctx) {

    const data = await getAllData()

    ctx.render(dashboardTemplate(data))
}
