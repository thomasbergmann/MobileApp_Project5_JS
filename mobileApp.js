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

        fillParkListDiv(result.data);
        fillCarousel(result.data);

    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    })

function russel() {
    var options = {
        duration: 400
    }
    document.addEventListener('DOMContentLoaded', function () {
        let elems = document.querySelectorAll('.carousel');
        let instances = M.Carousel.init(elems);

        // instances = document.createElement("img")
        // console.log(instances)
    });
}


/////------------builds carousel and fills content-------------/////

function fillCarousel(data) {
    let parkImgCarousel = document.getElementById("carouselID")
    // let sliderCarousel = document.getElementById("parkImg")

    console.log(data[0].images[0].url)
    let i = 0;

    data.forEach((data, index) => {
        if (index < 5) {
            parkImgs.push(data.images[0].url)
            console.log(data.images[0].url)

            let sliderCarousel = document.createElement("a")
            let test = ["#one!", "#two!", "#three!", "#four!", "#five!"]
            sliderCarousel.className = "carousel-item"

            while (i < test.length) {
                sliderCarousel.setAttribute("href", test[i])
                i++;
                break;
            }

            let singleImg = document.createElement("img")
            singleImg.src = data.images[0].url

            parkImgCarousel.appendChild(sliderCarousel)
            sliderCarousel.appendChild(singleImg)
        }

    })
    // russel()
    document.addEventListener('DOMContentLoaded', function (event) {
        console.log(event)
        let elems = document.querySelectorAll('.carousel');
        let instances = M.Carousel.init(elems);

        // instances = document.createElement("img")
        // console.log(instances)
    });
}



//////----------------create and fill park list div----------------//////

function fillParkListDiv(data) {
    console.log(data[0].fullName);
    let parkListDiv = document.getElementById("dropdownList");

    data.forEach((data) => {
        parkList.push(data.fullName);

        let parkListName = document.createElement("tr");
        parkListName.innerHTML = data.fullName;
        let parkListButton = document.createElement("button");
        parkListButton.innerHTML = "Show More Info";

        parkListDiv.appendChild(parkListName)
        parkListDiv.appendChild(parkListButton)
    })
}