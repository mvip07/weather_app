const APIBASE = "https://api.openweathermap.org/data/3.0";
const APIKEY = "20cda0e6977334e2a68462c27fdc88df";
const GEO = navigator.geolocation

function weakUp() {
    const body = document.querySelector('body');
    const section = document.querySelector('#weather')
    const loader = document.querySelector('.lds-spinner')

    loader.classList.add("none")
    body.classList.remove("hidden")
    section.classList.remove("blur")
}

GEO.getCurrentPosition((position) => {
    const { longitude, latitude } = position.coords

    if (longitude && latitude) {
        fetch(`${APIBASE}/onecall?lat=${latitude}&lon=${longitude}&exclude=current&appid=${APIKEY}`)
            .then((res) => res.json())
            .then((res) => {
                JoinWeather(res)
                weakUp()
            })

            .catch((err) => {
                console.log(err)
                weakUp()
            })
    }
})

function JoinWeather(data) {
    const getWhetherHtml = document.querySelector('#weather')

    for (let i of data?.daily) {
        let date = new Date(i.dt * 1000).toLocaleString({ weekday: "" })
        getWhetherHtml.innerHTML += `
            <div class="item">
                <div class="top">
                    <p>${date.slice(0, -13)}</p>
                    <h2>${Math.round(i?.temp?.day)} °C</h2>
                    <span>${i?.weather[0].main}</span>
                </div>
                <div class="image">
                    <img src="http://openweathermap.org/img/wn/${i.weather[0].icon}.png" alt="" />
                </div>               
                <div class="line"></div>
                <div class="bottom">
                    <div class="bottom_item">
                        <h4>${Math.round(i?.temp?.max)} °C</h4>
                        <span>Max Temp</span>
                    </div>
                    <div class="bottom_item">
                        <h4>${Math.round(i?.temp?.min)} °C</h4>
                        <span>Min Temp</span>
                    </div>
                    <div class="bottom_item">
                        <h4>${Math.round(i?.wind_deg)} °C</h4>
                        <span>Wind Degree</span>
                    </div>
                    <div class="bottom_item">
                        <h4>${Math.round(i?.wind_speed)} m/s</h4>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        `
    }
}
