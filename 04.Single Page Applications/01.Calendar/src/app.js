import { displayCalendar } from './utils.js';

function app() {
    const monthsDictionary = {
        Jan: '1',
        Feb: '2',
        Mar: '3',
        Apr: '4',
        May: '5',
        Jun: '6',
        Jul: '7',
        Aug: '8',
        Sept: '9',
        Oct: '10',
        Nov: '11',
        Dec: '12',
    };

    const yearsCalendar = document.getElementById('years');
    displayCalendar(yearsCalendar);

    Array.from(yearsCalendar.querySelectorAll('.day')).forEach((x) =>
        x.addEventListener('click', showYearCalendar)
    );

    function showYearCalendar(event) {
        event.preventDefault();
        let year = '';
        if (event.target.tagName === 'TD') {
            year = event.target.querySelector('div').textContent;
        } else {
            year = event.target.textContent;
        }
        const monthCalendar = document.getElementById(`year-${year}`);
        displayCalendar(monthCalendar);

        Array.from(monthCalendar.querySelectorAll('.day')).forEach((x) =>
            x.addEventListener('click', showMonthCalendar)
        );

        function showMonthCalendar(event) {
            let month = '';
            if (event.target.tagName === 'TD') {
                month = event.target.querySelector('div').textContent;
            } else {
                month = event.target.textContent;
            }
            const monthCalendar = document.getElementById(
                `month-${year}-${monthsDictionary[month]}`
            );
            displayCalendar(monthCalendar);
        }
    }
}
app();