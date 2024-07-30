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

function select(name) {
    var links = document.querySelectorAll('.nav-btn');
    links.forEach(link => {
        link.classList.remove('select');
    });
    name.classList.add('select');
}

function copietxt() {
    let popup = document.getElementById('popup-mail');
    navigator.clipboard.writeText('thomashenry7750@gmail.com')
    popup.style.display = 'block';
    var i = 0;
    function move() {
        if (i == 0) {
            i = 1;
            var elem = document.getElementById("myBar");
            var width = 2;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                } else {
                    width += 0.2;
                    elem.style.width = width + "%";
                }
            }
        }
    }
    move()
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}


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

//usage:
readTextFile("./langProg.json", function (text) {
    var dataLang = JSON.parse(text);
    let front = dataLang['Frontend'],
        back = dataLang['Backend'];
    front = Object.keys(dataLang['Frontend']).map((key) => [key, dataLang['Frontend'][key]]);
    back = Object.keys(dataLang['Backend']).map((key) => [key, dataLang['Backend'][key]]);

    front.forEach(element => {
        let langs = Object.keys(element[1]).map((key) => [key, element[1][key]]);
        langs.forEach(lang => {
            let div = document.createElement('div');
            div.className = 'card-lang';
            let img = document.createElement('img');
            img.src = lang[1]['img'];
            div.appendChild(img);
            let p = document.createElement('p');
            p.textContent = lang[1]['name'];
            div.appendChild(p);
            FrontContainer.appendChild(div);
        });
    });

    back.forEach(element => {
        let langs = Object.keys(element[1]).map((key) => [key, element[1][key]]);
        langs.forEach(lang => {
            let div = document.createElement('div');
            div.className = 'card-lang';
            let img = document.createElement('img');
            img.src = lang[1]['img'];
            div.appendChild(img);
            let p = document.createElement('p');
            p.textContent = lang[1]['name'];
            div.appendChild(p);
            backContainer.appendChild(div);
        });
    });
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

let loader = document.getElementById('loader');
let imgLoader = document.getElementById('imgLoader');
let textLoader = document.getElementById('textLoader');
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', _ => {
    setTimeout(_ => {
        textLoader.style.animation = 'none';
        textLoader.style.opacity = '0';
        imgLoader.style.opacity = '0';
        setTimeout(_=>{
            loader.style.display = 'none';
            document.body.style.overflow = 'auto';
        },1000)
    }, 2000);
});

