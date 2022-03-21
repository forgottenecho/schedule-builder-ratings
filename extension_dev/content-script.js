// params
const API_ENDPOINT = "http://localhost:5000/rating";
const REFRESH_RATE = 1; // seconds

// for processing
cache = {}

console.log("Loading up RateMyProfessors for schedule builder!");

// creates async requests
function x(theUrl, callback, arg1, arg2)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText, arg1, arg2);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// name processing helper func
function w(nameText) {
    // split the name into its parts
    var parts = nameText.split('(')[0].split(',');

    if (parts.length != 2) {
        return undefined;
    }

    parts[0] = parts[0].trim();
    parts[1] = parts[1].trim();

    return parts[0] + ' ' + parts[1];
}

// gets a rating for each professor and updates the HTML accordingly
function z() {
    console.log("Inside update");

    // snag up all professors on the page
    var profs = document.querySelectorAll(".sec-instructor");

    // name formatting [last], [first]
    for (var i=0; i<profs.length; i++) {
        // skip already-processed profs
        if (profs[i].getAttribute('processed') == 'True') {
            console.log('Skipping already processed');
            continue;
        }

        // get HTML text of prof name [last], [first]
        var nameStr = profs[i].innerText;

        // if for some reason there is no name
        if (nameStr === undefined) {
            console.log('Skipping undef');
            continue;
        }

        console.log('Processing professor: '+ nameStr);

        var fullName = w(nameStr)
        
        if (fullName === undefined) {
            console.log("Some name problem, skpping");
            continue;
        }

        // do a lookup in our cache first
        rating = cache[fullName];
        if (rating !== undefined) {
            // cache hit
            if (rating == '') {
                // API hasn't returned to callback yet
                continue; // we'll have to try to process it again later
            }
            console.log("CACHE HIT")
            y(rating, profs[i], false);
        } else {
            // get prof's rating from API
            var parts = fullName.split(' ');
            var firstName = parts[0];
            var lastName = parts[1];
            var url = API_ENDPOINT + '?firstName=' + encodeURIComponent(firstName) + '&lastName=' + encodeURIComponent(lastName) + '&uni=NJIT';
            console.log(url);
            x(url, y, profs[i], true); // call back gets resptxt and elem
            
            // reserve cache space with uninit'd value
            cache[fullName] = '';
        }
        profs[i].setAttribute('processed', 'True');
    }

    
    // call self again after certain amount of time
    setTimeout(z, REFRESH_RATE*1000);

    return profs.length;
}

// this is the callback for the HTTP req
function y(rating, prof, updateCache) {
    // update cache if necessary
    if (updateCache) {
        // if it is an integer, append '.0'
        if (rating.length == 1) {
            rating += '.0';
        }

        console.log('API gave ' + prof.innerText + ' rating: ' + rating);
        cache[w(prof.innerText)] = rating;
        console.log('Cache updated');
    }

    // append rating to the html
    prof.innerHTML += ' (' + rating + ')';

}

// call update() all resources have loaded
window.addEventListener("load", z);