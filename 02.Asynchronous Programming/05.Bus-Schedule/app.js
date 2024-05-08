// function solve() {
//     const info = document.getElementById('info')
//     const arriveBtn = document.getElementById('arrive')
//     const departBtn = document.getElementById('depart')
//
//     let nextStopId = 'depot'
//     let stopName
//
//     async function depart() {
//
//         try {
//             const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`)
//
//             if (response.ok === false) {
//                 let error = new Error()
//                 error.status = response.status
//                 error.statusText = response.statusText
//                 throw error
//             }
//
//             const data = await response.json()
//             stopName = data.name
//             nextStopId = data.next
//             info.textContent = `Next stop ${data.name}`
//             departBtn.disabled = true
//             arriveBtn.disabled = false
//
//         } catch (e) {
//             info.textContent = 'Error'
//             arriveBtn.disabled = true
//             departBtn.disabled = true
//         }
//
//
//     }
//
//     function arrive() {
//         info.textContent = `Arriving at ${stopName}`
//         arriveBtn.disabled = true
//         departBtn.disabled = false
//
//     }
//
//     return {
//         depart,
//         arrive
//     };
// }
//
// let result = solve();

function solve() {
    let currentStop = 'depot';
    let nextStop = '';
    let infoBox = document.getElementsByClassName('info')[0];

    function depart() {
        let baseURL = 'http://localhost:3030/jsonstore/bus/schedule/';
        fetch((baseURL + currentStop))
            .then((res) => res.json())
            .then((data) => {
                currentStop = data.name;
                nextStop = data.next;
                infoBox.textContent = `Next stop ${currentStop}`;
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = false;
            })
            .catch((error) => {
                infoBox.textContent = "Error";
                document.getElementById('depart').disabled = true;
                document.getElementById('arrive').disabled = true;
            });

    }

    function arrive() {
        infoBox.textContent = `Arriving at ${currentStop}`;
        document.getElementById('depart').disabled = false;
        document.getElementById('arrive').disabled = true;
        currentStop = nextStop;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();