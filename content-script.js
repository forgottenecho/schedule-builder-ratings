console.log("Loading up RateMyProfessors for schedule builder!");
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function init() {
    const DELAY = 5000;

    var pane = document.getElementsByClassName("course-list");
    if (pane.length >= 1) {
        // add in the ratings after DELAY ms
        setTimeout(update, DELAY);

        // attach necessary listenres to update ratings
        // FIXME

        // stop waiting for the page to load
        document.body.removeEventListener("mousemove", init);
    }
}
function update() {
    // snag up all professors on the page
    var profs = document.getElementsByClassName("sec-instructor");

    // name formattingL [last], [first]
    for (var i=0; i<profs.length; i++) {
        var name = profs[i].innerText;
        console.log(name);
    }

    return profs.length;
}

document.body.addEventListener("mousemove", init);