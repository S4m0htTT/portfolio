let FrontContainer = document.getElementById("FrontContainer");
let backContainer = document.getElementById("BackContainer");
let burgerMenu = document.getElementById("burgerMenu");
let menuTel = document.getElementById("menuTel");
let boolMenuTel = false;
let accueilTel = document.getElementById("accueil-tel"),
    aproposTel = document.getElementById("propos-tel"),
    projetTel = document.getElementById("projet-tel"),
    contactTel = document.getElementById("contactBtn-tel");

var nav = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        nav.classList.add('bg-black');
    } else {
        nav.classList.remove('bg-black');
    }
});

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    } else {
        return vars;
    }
}
const projetName = decodeURI($_GET()['name']);
let description, img, url, langage;

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

readTextFile("./projets.json", function (text) {
    var projets = JSON.parse(text);
    projets = Object.keys(projets).map((key) => [key, projets[key]]);
    projets.forEach(element => {
        if (element[0] == projetName) {
            var infoProjet = Object.keys(element[1]).map((key) => [key, element[1][key]]);
            infoProjet.forEach(info => {
                description = info[1]['description'];
                url = info[1]['url'];
                langage = info[1]['languages'];
                img = Object.keys(info[1]['img']).map((key) => [key, info[1]['img'][key]]);
                img = img[0][1]
                img = Object.keys(img).map((key) => [key, img[key]]);
            });
        }
    });
    if (description == null) {
        alert("Project Not Found")
        window.location.href = "./index.html#projets";
    } else {
        document.title = `Projet - ${projetName}`
        // let h1 = document.createElement('h1')
        // h1.innerHTML = projetName
        // document.body.appendChild(h1)
        // h1 = document.createElement('h2')
        // h1.innerHTML = "description : " + description
        // document.body.appendChild(h1)
        // if (url != null) {
        //     h1 = document.createElement('h2')
        //     h1.innerHTML = "url : " + url
        //     document.body.appendChild(h1)
        // }
        // if (img != null) {
        //     h1 = document.createElement('h2')
        //     h1.innerHTML = "img : "
        //     document.body.appendChild(h1)
        //     img.forEach(img => {
        //         let imgtxt = document.createElement('p')
        //         imgtxt.innerHTML = img[1]
        //         document.body.appendChild(imgtxt)
        //     });
        // }
        // if (langage!= null) {
        //     h1 = document.createElement('h2')
        //     h1.innerHTML = "langage : " + langage
        //     document.body.appendChild(h1)
        // }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll('.nav-btn');
    links.forEach(link => {
        link.classList.remove('select');
    });
    var hash = window.location.hash;
    if (hash == '#Apropos') {
        document.getElementById('propos').classList.add('select');
    } else if (hash == '#projets') {
        document.getElementById('projet').classList.add('select');
    } else if (hash == '#contact') {
        document.getElementById('contactBtn').classList.add('select');
    } else {
        document.getElementById('accueil').classList.add('select');
    }
});

burgerMenu.addEventListener('click', _ => {
    if (boolMenuTel) {
        menuTel.style.display = 'none';
        boolMenuTel = false;
    } else {
        menuTel.style.display = 'flex';
        boolMenuTel = true;
    }
});

accueilTel.addEventListener('click', _ => {
    menuTel.style.display = 'none';
    boolMenuTel = false;
});

aproposTel.addEventListener('click', _ => {
    menuTel.style.display = 'none';
    boolMenuTel = false;
});

projetTel.addEventListener('click', _ => {
    menuTel.style.display = 'none';
    boolMenuTel = false;
});

contactTel.addEventListener('click', _ => {
    menuTel.style.display = 'none';
    boolMenuTel = false;
});
if (document.getElementById('header').offsetHeight == 0) {
    document.getElementById('container-info').style.marginTop = document.getElementById('headerTel').offsetHeight + 'px';
} else {
    document.getElementById('container-info').style.marginTop = document.getElementById('header').offsetHeight + 'px';
}
