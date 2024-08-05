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
        // alert("Project Not Found")
        window.location.href = "./index.html#projets";
    } else {
        document.title = `Projet - ${projetName}`
        document.getElementById('projetTitle').innerHTML = projetName
        document.getElementById('description').innerHTML = description
        if (url != null) {
            document.getElementById('link').innerHTML = url
        }
        if (url == "") {
            document.getElementById('linkTitle').style.display = 'none'
        }
        if (img != null) {
            let i = 1,
                wrapper = document.getElementById('wrapper'),
                slider = document.getElementById('slider'),
                controls = document.getElementById('controls');
            img.forEach(img => {
                let input = document.createElement('input'),
                    div = document.createElement('div'),
                    label = document.createElement('label');

                input.type = 'radio';
                input.name = 'point';
                input.id = 'slide' + i;
                if (input.id == 'slide1') {
                    input.checked = true;
                }
                wrapper.insertBefore(input, slider)

                label.htmlFor = input.id;
                controls.appendChild(label);

                div.classList.add('slides');
                div.classList.add(input.id);
                div.style.backgroundImage = `url(${img[1]})`;
                div.style.backgroundSize = 'contain';
                div.style.backgroundPosition = 'center';
                div.style.backgroundRepeat = 'no-repeat';
                slider.appendChild(div);

                i++
            });
        }
        if (langage != null) {
            document.getElementById('language').innerHTML = langage
        }
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

    setTimeout(_ => {
        let inputs = document.getElementsByTagName('input');

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('click', _ => {
                clearInterval(slide);
                slide = setInterval(_ => {
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].checked) {
                            inputs[i].checked = false;
                            setTimeout(_ => {
                                if (inputs[i + 1]) {
                                    inputs[i + 1].checked = true;
                                } else {
                                    inputs[0].checked = true;
                                }
                            }, 100)
                        }
                    }
                }, 5000)
            })
        }

        var slide = setInterval(_ => {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].checked) {
                    inputs[i].checked = false;
                    setTimeout(_ => {
                        if (inputs[i + 1]) {
                            inputs[i + 1].checked = true;
                        } else {
                            inputs[0].checked = true;
                        }
                    }, 100)
                }
            }
        }, 5000)
    }, 1000);
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

