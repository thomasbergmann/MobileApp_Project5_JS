// https: //developer.nps.gov/api/v1/parks?&api_key=imaoEsf9fjlFLYS7piqcvUZAqO3K6ZwcRSTboJM6
// let data = data.results[0].data
let searchMethod;

fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}`)
    .then(response => {
        console.log(response)
        return response.json();
    })
    .then(result => {
        console.log(result);
        controller(result);
    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    })

function controller(data) {
    console.log(data)
    showData(data)
}

// let data = data.result[0].data;


var options = {
    duration: 400
}

document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems, options);
    // instances.src = "http://developer.nps.gov/api/v1" + data.data[0].images; /--/not working--//
    instances = document.createElement("img")
    instances.src = data[0].images[0]
});

//--does not work----gooooooshshhhhh!!!!!!//
function showData(data) {
    let parkLinkDiv = document.getElementById("dropdownList");

    data.forEach((item, index) => {

        let parkLinkName = document.createElement("h2");
        parkLinkName.innerHTML = item.fullname;
        let parkLink = document.createElement("button");
        parkLink.innerHTML = "Show More Info";

        parkLinkDiv.appendChild("parkLinkName")
        parkLinkDiv.appendChild("parkLink")
    })
}

///----also not working-----///

// function fillCarousel(data) {
//     let parkImgs = document.getElementById("carousel")

//     data.forEach((item, index) => {

//         let singleImg = document.createElement("a")
//         singleImg.className = "carousel-item"
//         singleImg.src = "http: //developer.nps.gov/api/v1/parks?" + data[0].images
//     })
// }
// fillCarousel();