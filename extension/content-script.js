API_ENDPOINT = "http://localhost:5000/rating"

console.log("Loading up RateMyProfessors for schedule builder!");

// creates async requests
function httpGetAsync(theUrl, callback, arg)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, arg);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// gets a rating for each professor and updates the HTML accordingly
function update() {
    console.log("Inside update");

    // snag up all professors on the page
    var profs = document.querySelectorAll(".sec-instructor");

    // name formatting [last], [first]
    for (var i=0; i<profs.length; i++) {
        // get HTML text of prof name [last], [first]
        var name = profs[i].innerText;
        console.log('Processing professor: '+ name);

        // split the name into its parts
        var parts = name.split(',');
        var firstName = parts[1].trim();
        var lastName = parts[0].trim();

        // get their rating from API
        var url = API_ENDPOINT + '?firstName=' + encodeURIComponent(firstName) + '&lastName=' + encodeURIComponent(lastName) + '&uni=NJIT';
        console.log(url);
        httpGetAsync(url, appendRating, profs[i]); // call back gets resptxt and elem
    }

    return profs.length;
}

// this is the callback for the HTTP req
function appendRating(rating, prof) {
    console.log('API gave ' + prof.innerText + 'rating: ' + rating);
    
    // if it is an integer, append '.0'
    if (rating.length == 1) {
        rating += '.0';
    }

    // append rating to the html
    prof.innerHTML += ' (' + rating + ')';
}

// call update() all resources have loaded
window.addEventListener("load", update);
