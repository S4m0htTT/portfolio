function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value!== undefined? value : '';
        }
    );

    if ( param ) {
        return vars[param]? vars[param] : null;
    } else {
        return vars;
    }
}
const projetName = decodeURI($_GET()['name']);
let description, img, url;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("./projets.json", function(text) {
    var projets = JSON.parse(text);
    projets = Object.keys(projets).map((key) => [key, projets[key]]);
    projets.forEach(element => {
        if (element[0] == projetName) {
            var infoProjet = Object.keys(element[1]).map((key) => [key, element[1][key]]);
            infoProjet.forEach(info => {
                description = info[1]['description'];
                url = info[1]['url'];
                img = Object.keys(info[1]['img']).map((key) => [key, info[1]['img'][key]]);
                img = img[0][1]
                img = Object.keys(img).map((key) => [key, img[key]]);
            });
        } 
    });
    if (description == null){
        alert("Project Not Found")
        window.location.href = "./index.html#projets";
    } else {
        let h1 = document.createElement('h1')
        h1.innerHTML = projetName
        document.body.appendChild(h1)
        h1 = document.createElement('h2')
        h1.innerHTML = "description : " + description
        document.body.appendChild(h1)
        if (url != null) {
            h1 = document.createElement('h2')
            h1.innerHTML = "url : " + url
            document.body.appendChild(h1)
        }
        if (img != null) {
            h1 = document.createElement('h2')
            h1.innerHTML = "img : "
            document.body.appendChild(h1)
            img.forEach(img => {
                let imgtxt = document.createElement('p')
                imgtxt.innerHTML = img[1]
                document.body.appendChild(imgtxt)
            });
        }
    }
});
