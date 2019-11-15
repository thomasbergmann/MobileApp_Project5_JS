let parkImgs = [];
let parkList = [];
let parkInfos = [];

//fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}&fields=images&limit=20`)
fetch(`https://271105011696-nsp-apifake.s3.eu-central-1.amazonaws.com/response.json`)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(result => {
        console.log(result)
        console.log(result.data[0].images[0].url); //First pic

        ///------------builds carousel and fills content-------------/////
        let carousel = document.getElementById("carouselID");
        for (let i = 0; i < result.data.length; i++) {
            for (let x = 0; x < result.data[i].images.length; x++) {
                let a = document.createElement("a");
                a.setAttribute("class", "carousel-item");
                let p = document.createElement("p");
                p.setAttribute("class", "nameImg");
                p.innerHTML = result.data[i].name;
                let img = document.createElement("img");
                img.src = "https://demo.cloudimg.io/width/200/n/" + result.data[i].images[x].url;

                a.appendChild(img)
                a.appendChild(p)
                carousel.appendChild(a)
            }
        }
        M.AutoInit();
        // fillParkListDiv(result.data);
        filterDropdownList(result.data);
        // filterContentSecondPage(result.data);
    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    });


function filterDropdownList(data) {

    document.getElementById("searchButton").addEventListener("click", () => {
        // when clicked shows filtered search below
        let searchTerm = document.getElementById("searchInput").value
        console.log(searchTerm)
        let filteredList = [];
        data.forEach(function (park) {
            if (searchTerm.toLowerCase() === park.name.toLowerCase() || searchTerm.toLowerCase() === park.states.toLowerCase()) {
                filteredList.push(park)

                document.getElementById("dropdownList").style.visibility = "visible"

            }
        })
        fillParkListDiv(filteredList);
    })
};



//////----------------create and fill park list div----------------//////


function fillParkListDiv(data) {
    console.log(data)

    if (data.length == 0) {
        let parkListError = document.getElementById("errorDiv")
        parkListError.innerHTML = ""
        let listError = document.createElement("tr")
        listError.setAttribute("class", "errorText")
        listError.innerHTML = "check typing--something is incorrect or park is not listed-->>use link above of official NSP Homepage<<--"

        parkListError.appendChild(listError)

        document.getElementById("errorDiv").style.visibility = "visible";

    } else {
        document.getElementById("errorDiv").style.visibility = "none";
        let parkListDiv = document.getElementById("dropdownList");
        parkListDiv.innerHTML = "";

        data.forEach((park) => {

            let divTR = document.createElement("div")
            divTR.className = "divTR"
            let parkListName = document.createElement("tr")
            let parkListButton = document.createElement("p")
            parkListButton.innerHTML = park.fullName + " / " + park.states
            parkListButton.setAttribute("id", park.id)
            parkListButton.addEventListener("click", function (event) {
                filterContentPages(data, event)
            })
            parkListButton.className = "stateClick"
            parkListButton.style.color = "white" /*change to black for mobile app*/

            parkListDiv.appendChild(divTR)
            divTR.appendChild(parkListName)
            divTR.appendChild(parkListButton)
        })
    }

}



///////----------show and hide pages---------------//////////

function filterContentPages(data, event) {
    console.log(data)
    console.log(event.target.id)

    data.forEach(function (info) {

        if (event.target.id === info.id) {
            buildSecondPage(info);
            firstPage.innerHTML = "";
            // } else {
            //     document.getElementById("secondPage").style.visibility = "none";

            //     buildThirdPage(info);
            //     firstPage.innerHTML = "";
            //     secondPage.innerHTML = "";

            // }

        }
    })
};

//////////------------------build second page-------------------////////

function buildSecondPage(data) {

    console.log(data)
    let secondPage = document.getElementById("secondPage")
    secondPage.innerHTML = "";

    let divNavButtons = document.createElement("div")
    divNavButtons.setAttribute("class", "navBTN")
    let buttonDirections = document.createElement("button")
    buttonDirections.setAttribute("id", data.id)
    console.log(buttonDirections)
    buttonDirections.innerHTML = "How to get there"
    buttonDirections.addEventListener("click", function (event) {
        buildThirdPage(data, event)
        secondPage.innerHTML = "";
        // initMap()


    })

    //to do---new fetch below for campgrounds//change code//
    let buttonCampgrounds = document.createElement("button")
    buttonCampgrounds.setAttribute("id", data.id)
    buttonCampgrounds.innerHTML = "Find a Campground"
    buttonCampgrounds.addEventListener("click", function (event) {
        buildFourthPage(data, event)
        thirdPage.innerHTML = "";
    })


    let divDescription = document.createElement("div")
    divDescription.setAttribute("id", "descriptionInfo")
    let headDescription = document.createElement("h2")
    headDescription.innerHTML = "Park Description:"
    let contextDescription = document.createElement("div")
    contextDescription.setAttribute("id", "contextDiv")
    contextDescription.innerHTML = data.description


    let divWeather = document.createElement("div")
    divWeather.setAttribute("id", "weatherInfo")
    let headWeather = document.createElement("h2")
    headWeather.innerHTML = "Weather Information:"
    let contextWaether = document.createElement("div")
    contextWaether.setAttribute("id", "contextDiv")
    contextWaether.innerHTML = data.weatherInfo

    let backButton1 = document.createElement("div")
    backButton1.setAttribute("id", "backBTN")
    let button1 = document.createElement("button")
    backButton1.setAttribute("id", "button1")
    button1.innerHTML = "BACK"
    button1.className = "btn waves-effect waves-teal"
    button1.addEventListener("click", function () {
        window.history.back();
    });

    secondPage.appendChild(divNavButtons)
    divNavButtons.appendChild(buttonDirections)
    divNavButtons.appendChild(buttonCampgrounds)

    secondPage.appendChild(divDescription)
    divDescription.appendChild(headDescription)
    divDescription.appendChild(contextDescription)
    secondPage.appendChild(divWeather)
    divWeather.appendChild(headWeather)
    divWeather.appendChild(contextWaether)
    secondPage.appendChild(backButton1)
    backButton1.appendChild(button1);

    document.getElementById("secondPage").style.visibility = "visible";
}


/////////-------------------build third Page---------------------////////////////


function buildThirdPage(data) {

    let thirdPage = document.getElementById("thirdPage")
    thirdPage.innerHTML = "";

    let divHead = document.createElement("div")
    divHead.setAttribute("id", "headDiv")
    let headMaps = document.createElement("h2")
    headMaps.innerHTML = "Directions:"
    let contextMaps = document.createElement("div")
    contextMaps.setAttribute("id", "contextDiv")
    contextMaps.innerHTML = data.directionsInfo

    let hr = document.createElement("hr")
    hr.style.color = "white"

    let divMaps = document.createElement("div")
    divMaps.setAttribute("id", "maps")
    let mapsLink = document.createElement("a")
    mapsLink.innerHTML = data.directionsUrl


    backButton2 = document.getElementById("backBTN")
    let button2 = document.createElement("button")
    button2.setAttribute("id", "button2")
    button2.innerHTML = "<-<<---"
    button2.className = "btn waves-effect waves-teal"
    button2.addEventListener("click", function () {
        window.history.back();
    });


    thirdPage.appendChild(divHead)
    divHead.appendChild(headMaps)
    divHead.appendChild(contextMaps)
    thirdPage.appendChild(hr)
    thirdPage.appendChild(divMaps)
    divMaps.appendChild(mapsLink)
    thirdPage.appendChild(backButton2)
    backButton2.appendChild(button2)

    document.getElementById("thirdPage").style.visibility = "visible";

}
// let maps = document.getElementById("maps")

// function initMap(data) {

//     let map = data[i].latLong

//     // The map, centered at Uluru
//     maps = new google.maps.Map(
//         document.getElementById('maps'), {
//             zoom: 4,
//             center: map
//         });
//     // The marker, positioned at
//     marker = new google.maps.Marker({
//         position: map,
//         map: map
//     });
// }


function buildFourthPage(data) {
    let fourthPage = document.getElementById("fourthPage")
    fourthPage.innerHTML = "";
    //fetch live data of campground//

    fetch(`https://developer.nps.gov/api/v1/campgrounds?&api_key=${API_key}&limit=40`)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(result => {
            console.log(result)

            let divCamp = document.createElement("div")
            divCamp.setAttribute("id", "campDiv")
            let campName = document.createElement("h2")
            campName.innerHTML = data.name

        })
}