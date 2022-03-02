console.log("Loading up RateMyProfessors for schedule builder!");
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

function update() {
    console.log("Inside update");
    // snag up all professors on the page
    var profs = document.getElementsByClassName("sec-instructor");

    // name formatting [last], [first]
    for (var i=0; i<profs.length; i++) {
        var name = profs[i].innerText;
        console.log(name);
        // var url = "https://www.ratemyprofessors.com/search/teachers?query="+encodeURIComponent(name)+"&sid=U2Nob29sLTY2OA==";
        // console.log(url);
        // httpGetAsync(url, append, profs[i]);
    }

    return profs.length;
}

function append(html, prof) {
    console.log(prof);
}
window.addEventListener("load", update);
