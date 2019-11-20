////////------------------------starting with live data for showing the carousel-------------------//////////////////

//fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}&fields=images`)
fetch(`http://localhost:8080/parks.json`)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(result => {
        console.log(result)
        console.log(result.data[0].images[0].url); //First pic

        //////----------------------------------------------builds carousel and fills content----------------------------------------///////

        let carousel = document.getElementById("carouselID");

        for (let i = 0; i < result.data.length; i++) {
            for (let x = 0; x < result.data[i].images.length; x++) {
                let a = document.createElement("a");
                a.setAttribute("class", "carousel-item");
                let p = document.createElement("p");
                p.setAttribute("class", "nameImg");
                p.innerHTML = result.data[i].name;
                let img = document.createElement("img");
                img.src = "http://localhost:8081/signature/auto/200/0/sm/0/plain/" + result.data[i].images[x].url;
                // base64 encoded url
                //img.src = "http://localhost:8081/signature/auto/200/0/sm/0/" + btoa(result.data[i].images[x].url);
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


//////--------------------------------------------filters the list of park - depending on search input---------------------------------//////

function filterParkListDiv(data) {

    document.getElementById("searchButton").addEventListener("click", () => {
        // when clicked shows filtered search below
        let searchTerm = document.getElementById("searchInput").value
        console.log(document.getElementById("searchInput").value)
        console.log(searchTerm)
        let filteredList = [];
        data.forEach(function (park) {



            if (searchTerm.toLowerCase() === park.name.toLowerCase() || searchTerm.toLowerCase() === park.states.toLowerCase()) {
                filteredList.push(park)
                document.getElementById("dropdownList").style.visibility = "visible";

            } else if (searchTerm == 0) {

                document.getElementById("carouselID").style.display = "block";
                document.getElementById("errorDiv").style.visibility = "hidden";
                document.getElementById("dropdownList").style.visibility = "hidden";

            }
        })
        buildParkListDiv(filteredList);
    })
};



//////----------------------------------------------creates and fills park list div-------------------------------------------------//////


function buildParkListDiv(data) {
    console.log(data)


    if (data.length == 0) {
        let parkListError = document.getElementById("errorDiv")
        parkListError.innerHTML = ""
        let listError = document.createElement("tr")
        listError.setAttribute("class", "errorText")
        listError.innerHTML = "check typing--something is incorrect or park is not listed-->>use link above of official NSP Homepage<<--"

        parkListError.appendChild(listError)

        document.getElementById("errorDiv").style.visibility = "visible";
        document.getElementById("carouselID").style.display = "none";

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

            document.getElementById("carouselID").style.display = "none";

        })
    }

}



///////----------------------filters which park of list is shown and will displayed on second page--------------------------------------//////////

function filterContentParkList(data, event) {
    console.log(data)
    console.log(event.target.id)

    data.forEach(function (info) {

        if (event.target.id === info.id) {
            buildSecondPage(info);


        }
    })
};

//////////-----------------------------------------------------builds second page--------------------------------------------------////////

function buildSecondPage(parks) {
    console.log(parks)

    let secondPage = document.getElementById("secondPage")
    secondPage.innerHTML = "";


    //------creates Nav Buttons----//
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

    //------creates BACK button-------//
    let backButton1 = document.createElement("div")
    backButton1.setAttribute("id", "backBTN")

    let button1 = document.createElement("button")
    button1.setAttribute("id", "button")
    button1.innerHTML = "BACK"
    button1.className = "btn waves-effect waves-teal"

    //------by clicking first Page is shown and second Page is hidden-----//
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


    //------creates BACK button-------//
    let backButton2 = document.createElement("div")
    backButton2.setAttribute("id", "backBTN")

    let button2 = document.createElement("button")
    button2.setAttribute("id", "button")
    button2.innerHTML = "Previous Page"
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
                divErrorCamp.innerHTML = "Sorry there are no Campgrounds listed"

                let backButton3 = document.createElement("div")
                backButton3.setAttribute("id", "backBTN")

                let button3 = document.createElement("button")
                button3.setAttribute("id", "button")
                button3.innerHTML = "Previous Page"
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
                    button3.setAttribute("id", "button")
                    button3.innerHTML = "Previous Page"
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

                    document.getElementById("fourthPage").classList.add("active")
                    document.getElementById("secondPage").classList.remove("active")
                    document.getElementById("thirdPage").classList.remove("active")
                })
            }
        })
}
/////----------------------building LOGIN Page--------------------------//////

function buildChatPage(documents) {
    const {
        email,
        name,
        message
    } = documents;
    console.log(documents)


    let chatPage = document.getElementById("chatPage")
    console.log()
    chatPage.innerHTML = "";

    let chatMain = document.createElement("div")
    chatMain.setAttribute("id", "loggedIn")

    let chatHeadline = document.createElement("p")
    chatHeadline.innerHTML = "Let`s chat !!!"

    let chatDiv = document.createElement("div")
    chatDiv.setAttribute("id", "chat")

    let messageDiv = document.createElement("div")
    messageDiv.setAttribute("id", "messages")
    let post = document.createElement("p")
    post.innerHTML = message;
    let user = document.createElement("p")
    user.innerHTML = name;


    let chatInput = document.createElement("input")
    chatInput.setAttribute("id", "chatInput")

    let chatBTN = document.createElement("button")
    chatBTN.setAttribute("id", "messageBTN")
    chatBTN.innerHTML = "Send Message"
    chatBTN.addEventListener("click", function () {
        writeMessages();

    })

    let logoutDiv = document.createElement("div")
    logoutDiv.setAttribute("class", "logoutDiv")

    let logoutBTN = document.createElement("button")
    logoutBTN.setAttribute("id", "logoutBTN")
    logoutBTN.innerHTML = "Log Out"
    logoutBTN.className = "btn waves-effect waves-teal"
    logoutBTN.addEventListener("click", function () {
        logout();

    })

    chatPage.appendChild(chatMain)
    chatMain.appendChild(chatHeadline)
    chatMain.appendChild(chatDiv)
    chatDiv.appendChild(messageDiv)
    messageDiv.appendChild(user);
    messageDiv.appendChild(post);
    chatDiv.appendChild(chatInput)
    chatDiv.appendChild(chatBTN)
    chatMain.appendChild(logoutDiv)
    logoutDiv.appendChild(logoutBTN)




}


////////--------------------------------------setting up firebase----LOGIN and CHAT Functions------------------------------///////

firebase.initializeApp(firebaseConfig);


let username = "";
let email = "";
let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();

function login() {
    // firstPage.innerHTML = "";

    firebase.auth().signInWithRedirect(provider)

}

let loggedIn = false;
firebase.auth().getRedirectResult().then(function (result) {

        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        let user = result.user;

        if (user !== null) {
            username = username.displayName;
            email = user.email;
            console.log("user", user);
            loggedIn = true;

            document.getElementById("chatPage").classList.add("active")
            document.getElementById("firstPage").classList.remove("active")

            readMessages();


        } else {


        }
    })
    .catch(function (error) {
        // Handle Errors here.
        console.log("error", error);
    })




function writeMessages() {

    let message = document.getElementById("chatInput").value;
    // console.log("chatInput", chatInput)
    // document.getElementById("messages").value;
    // console.log("messages", messages)

    let date = new Date();

    db.collection("messages")
        .add({
            message: message,
            name: username,
            email: email,
            date: date
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id)
            readMessages();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

function readMessages() {
    console.log("here")

    document.getElementById("messages")
    messageDiv.innerHTML = "";

    db.collection("messages").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data());

                const documents = doc.data();
                buildChatPage(documents);

            })

        })
}
console.log("db", db);

function logout() {
    chatPage.innerHTML = "";

    firebase
        .auth()
        .signOut()
        .then(function () {
            loggedIn = false;

            document.getElementById("firstPage").classList.add("active")
            document.getElementById("chatPage").classList.remove("active")

            //     // Sign-out successful.
            console.log("sign out was succesful")

        }).catch(function (error) {
            // An error happened.
            console.log("Error with logout")
        })
}