var nav = document.getElementById('header');
window.addEventListener('scroll', () =>{
    if (window.scrollY > 0){
        nav.classList.add('bg-black');
    }else{
        nav.classList.remove('bg-black');
    }
});

function select(name){
    var links = document.querySelectorAll('.nav-btn');
    links.forEach(link => {
        link.classList.remove('select');
    });
    name.classList.add('select');
}

function copietxt(){
    navigator.clipboard.writeText('thomashenry7750@gmail.com').then(()=>
    alert('Copied!'));
}