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
                    console.log("width=" + elem.style.width)
                }
            }
        }
    }
    move()
    setTimeout(() => {
        popup.style.display = 'none';
    }, 5000);
}


document.addEventListener("DOMContentLoaded", function (event) {
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

function fetchJSONData() {
    fetch("./projet.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => 
              console.log(data))
        .catch((error) => 
               console.error("Unable to fetch data:", error));
}
// fetchJSONData();