function attachEvents() {
    let weatherBtn = document.getElementById('submit');
    let inputField = document.getElementById('location');
    let currDiv = document.getElementById('current');
    let foreDiv = document.getElementById('forecast');
    let upcomDiv = document.getElementById('upcoming');
    let urlBase = `http://localhost:3030/jsonstore/forecaster/locations`;
    let urlCurrent = `http://localhost:3030/jsonstore/forecaster/today/`;
    let urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/`;


    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    weatherBtn.addEventListener('click', () => {

        fetch(urlBase).then((response) => response.json()).then(data => {
            let { name, code } = data.find(city => city.name.toLowerCase() === inputField.value.toLowerCase());

            let currPromise = fetch(urlCurrent + `${code}`)
                .then((response) => response.json());


            let upcomingPromise = fetch(urlUpcoming + `${code}`)
                .then((response) => response.json());


            Promise.all([currPromise, upcomingPromise])
                .then(([currData, upcomingData]) => {
                    let forecastDiv = createElement('div', 'forecasts', '');
                    let currentSymbol = symbols[currData.forecast.condition];
                    let conditionSpan = createElement('span', 'condition symbol', currentSymbol);
                    let parentSpan = createElement('span', 'condition', '');

                    let citySpan = createElement('span', 'forecast-data', currData.name);

                    let highLow = `${currData.forecast.low}${symbols.Degrees}/${currData.forecast.high}${symbols.Degrees}`;
                    let tempSpan = createElement('span', 'forecast-data', highLow);

                    let weatherStateSpan = createElement('span', 'forecast-data', currData.forecast.condition);

                    forecastDiv.appendChild(conditionSpan);
                    currDiv.appendChild(forecastDiv);
                    forecastDiv.appendChild(parentSpan);
                    parentSpan.appendChild(citySpan);
                    parentSpan.appendChild(tempSpan);
                    parentSpan.appendChild(weatherStateSpan);
                    foreDiv.style.display = 'block';

                    let divUpcomingForecast = createElement('div', 'forecast-info', '');

                    upcomingData.forecast.forEach(obj => {
                        let upcomingSpan = createElement('span', 'upcoming', '');
                        let conditionSymbolSpan = createElement('span', 'symbol', symbols[obj.condition]);
                        let highLow = `${obj.low}${symbols.Degrees}/${obj.high}${symbols.Degrees}`;
                        let tempSpan = createElement('span', 'forecast-data', highLow);

                        let weatherStateSpan = createElement('span', 'forecast-data', obj.condition);

                        upcomingSpan.appendChild(conditionSymbolSpan);
                        upcomingSpan.appendChild(tempSpan);
                        upcomingSpan.appendChild(weatherStateSpan);

                        divUpcomingForecast.appendChild(upcomingSpan);


                    })

                    upcomDiv.appendChild(divUpcomingForecast);
                    inputField.value = '';


                })


        }).catch(error => alert(error));

    });

    function createElement(type, classes, content) {
        let element = document.createElement(type);
        element.className = classes;
        element.innerHTML = content;

        return element;
    }
}

attachEvents();
