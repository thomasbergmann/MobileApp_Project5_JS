////////------------------------starting with live data for showing the carousel-------------------//////////////////

// fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}&fields=images&limit=20`)
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
                // img.src = "https://demo.cloudimg.io/width/200/n/" + result.data[i].images[x].url;
                img.src = result.data[i].images[x].url;


                a.appendChild(img)
                a.appendChild(p)
                carousel.appendChild(a)
            }
        }
        M.AutoInit();
        filterParkListDiv(result.data);
    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    });


function filterParkListDiv(data) {

    document.getElementById("searchButton").addEventListener("click", () => {
        // when clicked shows filtered search below
        let searchTerm = document.getElementById("searchInput").value
        console.log(document.getElementById("searchInput").value)
        console.log(searchTerm)
        let filteredList = [];
        data.forEach(function (park) {
            if (searchTerm.toLowerCase() === park.name.toLowerCase() || searchTerm.toLowerCase() === park.states.toLowerCase() || searchTerm === "") {
                filteredList.push(park)

                document.getElementById("dropdownList").style.visibility = "visible"
                document.getElementById("carouselID").style.display = "block"


            }
        })
        buildParkListDiv(filteredList);
    })
};



//////----------------create and fill park list div----------------//////


function buildParkListDiv(data) {
    console.log(data)

    //trying
    // document.getElementById("carouselID").style.visibility = "visible";
    // document.getElementById("carouselID").classList.add("active")


    if (data.length == 0) {
        let parkListError = document.getElementById("errorDiv")
        parkListError.innerHTML = ""
        let listError = document.createElement("tr")
        listError.setAttribute("class", "errorText")
        listError.innerHTML = "check typing--something is incorrect or park is not listed-->>use link above of official NSP Homepage<<--"

        parkListError.appendChild(listError)

        document.getElementById("errorDiv").style.visibility = "visible";
        // document.getElementById("carouselID").style.display = "none"

    } else {

        let parkListDiv = document.getElementById("dropdownList")
        parkListDiv.classList.add;
        parkListDiv.innerHTML = "";

        data.forEach((park) => {

            let divTR = document.createElement("div")
            divTR.className = "divTR"
            let parkListName = document.createElement("tr")
            let parkListButton = document.createElement("p")
            parkListButton.innerHTML = park.fullName + " / " + park.states
            parkListButton.setAttribute("id", park.id)
            parkListButton.setAttribute("data-parkCode", park.parkCode)
            //----by click event the  parkId and parkCode gets transmitted----//
            parkListButton.addEventListener("click", function (event) {
                filterContentParkList(data, event)
            })

            parkListButton.className = "stateClick"
            parkListButton.style.color = "white"

            parkListDiv.appendChild(divTR)
            divTR.appendChild(parkListName)
            divTR.appendChild(parkListButton)

            document.getElementById("carouselID").style.display = "none"

        })
    }

}



///////----------filters which park of list is shown and will displayed on second page---------------//////////

function filterContentParkList(data, event) {
    console.log(data)
    console.log(event.target.id)

    data.forEach(function (info) {

        if (event.target.id === info.id) {
            buildSecondPage(info);


        }
    })
};

//////////--------------------------build second page-------------------////////

function buildSecondPage(parks) {
    console.log(parks)

    let secondPage = document.getElementById("secondPage")
    secondPage.innerHTML = "";

    let divNavButtons = document.createElement("div")
    divNavButtons.setAttribute("class", "navBTN")
    let buttonDirections = document.createElement("button")
    buttonDirections.setAttribute("id", parks.id)
    console.log(buttonDirections)
    buttonDirections.innerHTML = "How to get there"
    buttonDirections.addEventListener("click", function (event) {
        buildThirdPage(parks, event)


        // initMap()

    })


    let buttonCampgrounds = document.createElement("button")
    buttonCampgrounds.setAttribute("data-parkCode", parks.parkCode)
    buttonCampgrounds.innerHTML = "Find a Campground"
    //------through event on click the parkcode is transmitted---and fourth page is build--//
    buttonCampgrounds.addEventListener("click", function (event) {
        let parkCode = event.target.getAttribute("data-parkCode");
        buildFourthPage(event, parkCode)

    })


    let divDescription = document.createElement("div")
    divDescription.setAttribute("class", "contextInfo")
    let headDescription = document.createElement("h2")
    headDescription.innerHTML = "Park Description:"
    let contextDescription = document.createElement("div")
    contextDescription.setAttribute("id", "contextDiv")
    contextDescription.innerHTML = parks.description


    let divWeather = document.createElement("div")
    divWeather.setAttribute("class", "contextInfo")
    let headWeather = document.createElement("h2")
    headWeather.innerHTML = "Weather Information:"
    let contextWeather = document.createElement("div")
    contextWeather.setAttribute("id", "contextDiv")
    contextWeather.innerHTML = parks.weatherInfo
    // contextWeather.src = parks.weatherInfo

    let backButton1 = document.createElement("div")
    backButton1.setAttribute("id", "backBTN")

    let button1 = document.createElement("button")
    button1.setAttribute("id", "button1")
    button1.innerHTML = "BACK"
    button1.className = "btn waves-effect waves-teal"

    //------by clicking first Page is shown and second Page is hidden---//
    button1.addEventListener("click", function () {

        document.getElementById("firstPage").classList.add("active")
        document.getElementById("secondPage").classList.remove("active")

    });

    secondPage.appendChild(divNavButtons)
    divNavButtons.appendChild(buttonDirections)
    divNavButtons.appendChild(buttonCampgrounds)

    secondPage.appendChild(divDescription)
    divDescription.appendChild(headDescription)
    divDescription.appendChild(contextDescription)
    secondPage.appendChild(divWeather)
    divWeather.appendChild(headWeather)
    divWeather.appendChild(contextWeather)
    secondPage.appendChild(backButton1)
    backButton1.appendChild(button1);

    document.getElementById("secondPage").classList.add("active")
    document.getElementById("firstPage").classList.remove("active")
}


/////////-------------------build third Page---------------------////////////////


function buildThirdPage(parks) {

    let thirdPage = document.getElementById("thirdPage")
    thirdPage.innerHTML = "";

    let divHead = document.createElement("div")
    divHead.setAttribute("class", "contextInfo")
    let headMaps = document.createElement("h2")
    headMaps.innerHTML = "Directions:"
    let contextMaps = document.createElement("div")
    contextMaps.setAttribute("id", "contextDiv")
    contextMaps.innerHTML = parks.directionsInfo

    let hr = document.createElement("hr")
    hr.style.color = "white"

    let divMaps = document.createElement("div")
    divMaps.setAttribute("id", "maps")
    let mapsLink = document.createElement("a")
    mapsLink.innerHTML = parks.directionsUrl



    let backButton2 = document.createElement("div")
    backButton2.setAttribute("id", "backBTN")

    let button2 = document.createElement("button")
    button2.setAttribute("id", "button2")
    button2.innerHTML = "BACK"
    button2.className = "btn waves-effect waves-teal onclick"

    //by clicking second Page is shown and third Page is hidden---//
    button2.addEventListener("click", function () {

        document.getElementById("secondPage").classList.add("active")
        document.getElementById("thirdPage").classList.remove("active")
        document.getElementById("fourthPage").classList.remove("active")

    });

    thirdPage.appendChild(divHead)
    divHead.appendChild(headMaps)
    divHead.appendChild(contextMaps)
    divHead.appendChild(hr)
    divHead.appendChild(divMaps)
    divMaps.appendChild(mapsLink)
    thirdPage.appendChild(backButton2)
    backButton2.appendChild(button2)

    document.getElementById("thirdPage").classList.add("active")
    document.getElementById("secondPage").classList.remove("active")

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
/// extract data attrib out of the event


function buildFourthPage(event, parkCode) {
    console.log(event)
    console.log(parkCode)

    let fourthPage = document.getElementById("fourthPage")
    fourthPage.innerHTML = "";

    //fetch live data of specific campground//
    fetch(`https://developer.nps.gov/api/v1/campgrounds?&api_key=${API_key}&parkCode=${parkCode}`)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(result => {
            console.log(result)

            if (result.data == 0) {
                let divErrorCamp = document.createElement("div")
                divErrorCamp.setAttribute("class", "contextInfo")
                divErrorCamp.innerHTML = "Sorry there`s no Campground listed"

                let backButton3 = document.createElement("div")
                backButton3.setAttribute("id", "backBTN")

                let button3 = document.createElement("button")
                button3.setAttribute("id", "button3")
                button3.innerHTML = "BACK"
                button3.className = "btn waves-effect waves-teal onclick"

                //by clicking second Page is shown and fourth Page is hidden
                button3.addEventListener("click", function () {

                    document.getElementById("secondPage").classList.add("active")
                    document.getElementById("fourthPage").classList.remove("active")

                });


                fourthPage.appendChild(divErrorCamp)
                divErrorCamp.appendChild(backButton3)
                backButton3.appendChild(button3)


                document.getElementById("fourthPage").classList.add("active")
                document.getElementById("secondPage").classList.remove("active")
                document.getElementById("thirdPage").classList.remove("active")



            } else {

                result.data.forEach(function (camp) {
                    console.log(result.data)

                    let divCamp = document.createElement("div")
                    divCamp.setAttribute("id", "campDiv")
                    let campName = document.createElement("h1")
                    campName.innerHTML = camp.name
                    let campDescription = document.createElement("tr")
                    campDescription.innerHTML = camp.description


                    let backButton3 = document.createElement("div")
                    backButton3.setAttribute("id", "backBTN")

                    let button3 = document.createElement("button")
                    button3.setAttribute("id", "button3")
                    button3.innerHTML = "BACK"
                    button3.className = "btn waves-effect waves-teal onclick"

                    //by clicking second Page is shown and fourth Page is hidden
                    button3.addEventListener("click", function () {

                        document.getElementById("secondPage").classList.add("active")
                        document.getElementById("fourthPage").classList.remove("active")

                    });


                    fourthPage.appendChild(divCamp)
                    divCamp.appendChild(campName)
                    divCamp.appendChild(campDescription)
                    fourthPage.appendChild(backButton3)
                    backButton3.appendChild(button3)


                    document.getElementById("secondPage").classList.remove("active")
                    document.getElementById("thirdPage").classList.remove("active")
                    document.getElementById("fourthPage").classList.add("active")
                })
            }
        })
}