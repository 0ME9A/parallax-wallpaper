// background img movement start---------------------------
let posX = 0;
let posY = 0;
function showCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    $("#move1").css("left", -(x / 5) + "px");
    $("#move1").css("top", -(y / 5) + "px");
    $("#move2").css("left", -(x / 6) + "px");
    $("#move2").css("top", -(y / 6) + "px");
    $("#move3").css("left", -(x / 7) + "px");
    $("#move3").css("top", -(y / 7) + "px");
}
// background img movement end---------------------------

$(document).ready(function () {
    // weather actions start here---------------------------
    let api = "";
    let city = "";
    let units = "metric";
    function weather(city, api, units = "metric") {

        let url = "http://api.openweathermap.org/data/2.5/weather?q=";
        fetch(url + city + "&appid=" + api + "&units=" + units).then((response) => response.json()).then((data) => {
            data.cod === 200 ? display_weather(data) : $("#address").text("Weather Error!!!");
        });

        function display_weather(data) {
            const { name } = data;
            const { icon, discription } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            const { country } = data.sys;
            const { cod } = data;
            if (name) {
                $("#address").text(`${name}, ${country}`)
                $("#temperature").text(temp);
                $("#weather-icon").attr('src', `icon/weather/${icon}.png`);
                if (units == "metric") {
                    $("#c_f").text("C");
                }
                else {
                    $("#c_f").text("F");
                }
            }
        }
    }
    // weather actions end here---------------------------

    // fetch quotes function from json files ---------------------------
    function fetchQuotes() {
        fetch('./script/quotes.json').then((response) =>
            response.json()).then((data) => console.log(data))
    }
    // fetch quotes function end here---------------------------

    // quotes timing function start---------------------------
    const quotesHandler = (time = 30) => {
        $.getJSON("./script/quotes.json", function (result) {
            let quotesIndex = Math.round(Math.random() * result.length)
            $("q").text(result[quotesIndex].text)
            $("strong").text('- ' + result[quotesIndex].author)
            setInterval(() => {
                let quotesIndex = Math.round(Math.random() * result.length)
                $("q").text(result[quotesIndex].text)
                $("strong").text('- ' + result[quotesIndex].author)
            }, 60000 * time);
        });
    }
    quotesHandler(.5)
    // quotes timing function end---------------------------

    // lively property listener start---------------------------
    let call_function = weather;

    livelyPropertyListener = (name, val) => {
        switch (name) {
            case "name":
                val == "" ? $("#name").text('') : $("#name").text(val);
                break;
            case "appid":
                api = val;
                call_function = '';
                call_function = weather;
                call_function(city, api)
                break;
            case "address":
                city = val;
                call_function = '';
                call_function = weather;
                call_function(city, api);
                break;
            case "unit":
                if (val === 0) {
                    units = "metric";
                    $("#c_f").text("C");
                    call_function = "";
                    call_function = weather;
                    call_function(city, api, units);
                } else {
                    units = "Imperial";
                    $("#c_f").text("F");
                    call_function = "";
                    call_function = weather;
                    call_function(city, api, units);
                }
                break;
            case "fontsize_1":
                $("#name").css("font-size", val + "vw");
                break;
            case "fontsize_2":
                val > 50 ? $("p").css("max-width", 1500 + "px") : $("p").css("max-width", 800 + "px");
                $("q").css("font-size", val + "px");
                break;
            case "weather_size":
                $(".weather-container").css("transform", `scale(${val / 2})`);
                break;
            case "quotes":
                val >= 1 ? quotesHandler(val) : quotesHandler();
                break;
            case "color_1":
                $("#name, q, #address").css("color", val);
                break;
            case "color_2":
                $("strong, #c_f, #deg_icon, #temperature").css("color", val);
                $("button").css("background", val)
                break;
            case "weather":
                val ? $(".weather-container").css("display", "flex") : $(".weather-container").css("display", "none")
                break;
            case "btnRefresh":
                call_function = '';
                call_function = weather;
                call_function(city, api, units);
                break;
            default:
                break;
        }
    }
    // lively property listener end---------------------------

});
