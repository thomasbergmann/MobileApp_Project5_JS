// https: //developer.nps.gov/api/v1/parks?&api_key=imaoEsf9fjlFLYS7piqcvUZAqO3K6ZwcRSTboJM6
let searchMethod;
let parkImgs = [];
let parkList = [];
fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}&fields=images`)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(result => {
        console.log(result)
        console.log(result.data[0].images[0].url); //First pic

        /////------------builds carousel and fills content-------------/////
        let carousel = document.getElementById("carouselID");
        for (let i = 0; i < result.data.length; i++) {
            for (let x = 0; x < result.data[i].images.length; x++) {
                let a = document.createElement("a");
                a.setAttribute("class", "carousel-item");
                let img = document.createElement("img");
                img.src = result.data[i].images[x].url;

                a.appendChild(img)
                carousel.appendChild(a)
            }
        }
        M.AutoInit();
        fillParkListDiv(result.data);
        filterDropdownList(result.data);
    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    });


function filterDropdownList(data) {

    document.getElementById("searchButton").addEventListener("click", () => {
        // let searchTerm = document.getElementById("searchInput").addEventListener("change", () => {
        let searchTerm = document.getElementById("searchInput").value
        console.log(searchTerm)
        let filteredList = [];
        data.forEach(function (park) {
            if (searchTerm.toLowerCase() === park.name.toLowerCase() || searchTerm.toLowerCase() === park.states.toLowerCase()) {
                filteredList.push(park)
                // document.getElementById("dropdownList").style.display = "visible"
            }
            // else
            //     document.getElementById("dropdownList").style.display = "none"
        })
        fillParkListDiv(filteredList)
    });
    // })
}

//////----------------create and fill park list div----------------//////
function fillParkListDiv(data) {
    console.log(data)
    let parkListDiv = document.getElementById("dropdownList");
    parkListDiv.innerHTML = ""
    data.forEach((data) => {
        parkList.push(data.fullName);

        let divTR = document.createElement("div")
        divTR.className = "divTR"
        let parkListName = document.createElement("tr")
        parkListName.innerHTML = data.fullName;
        let divBTN = document.createElement("div")
        divBTN.className = "divBTN"
        let parkListButton = document.createElement("button")
        parkListButton.innerHTML = "More Information"
        parkListButton.className = "buttonList"

        parkListDiv.appendChild(divTR)
        parkListDiv.appendChild(divBTN)
        divTR.appendChild(parkListName)
        divBTN.appendChild(parkListButton)
    })
}