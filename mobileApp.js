fetch(`https://developer.nps.gov/api/v1/parks?&api_key=${API_key}`)
    .then(result => {
        return result.json();
    }).then(result => {
        console.log(result);
    })
    .catch(function (error) {
        console.log(error, "this is wrong");
    })

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
});
var instance = M.Carousel.getInstance(elem);