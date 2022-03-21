API_ENDPOINT = "http://localhost/"

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
        var name = profs[i].innerText;
        console.log('Processing professor: '+ name);
        var url = API_ENDPOINT + encodeURIComponent(name);
        httpGetAsync(url, appendRating, profs[i]);
        // console.log(url);
    }

    return profs.length;
}

// this is the callback for the HTTP req
function appendRating(html, prof) {
    console.log(prof);
}

// call update() all resources have loaded
window.addEventListener("load", update);
