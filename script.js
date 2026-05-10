const ADMIN_PASSWORD = "IPhone33@foyj45@^";

/* GOOGLE BUTTON */

const googleBtn = document.getElementById("googleBtn");

googleBtn.onclick = () => {

let user = localStorage.getItem("laacibUser");

if(!user){

const name = prompt("Geli magacaaga");

if(name){

localStorage.setItem("laacibUser",name);

googleBtn.innerHTML = `
<img src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
<span>${name}</span>
`;

alert("Waad gashay");

}

}else{

googleBtn.innerHTML = `
<img src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
<span>${user}</span>
`;

}

};

window.onload = ()=>{

const user = localStorage.getItem("laacibUser");

if(user){

googleBtn.innerHTML = `
<img src="https://cdn-icons-png.flaticon.com/512/300/300221.png">
<span>${user}</span>
`;

}

};

let movies = JSON.parse(localStorage.getItem("movies")) || [];

function saveMovies(){

localStorage.setItem("movies",JSON.stringify(movies));

}

function renderMovies(){

const grid=document.getElementById('moviesGrid');

const search=document.getElementById('searchInput')
.value.toLowerCase();

grid.innerHTML='';

movies
.filter(movie =>
movie.name.toLowerCase().includes(search)
)

.forEach((movie)=>{

grid.innerHTML += `

<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.name}</h3>

<p><b>Jilayaasha:</b> ${movie.actors}</p>

<div class="stars">${movie.stars}</div>

<p>${movie.desc}</p>

<div class="actions">

<button class="watch"
onclick="window.open('${movie.video}')">
Daawo
</button>

<button class="download"
onclick="window.open('${movie.video}')">
Download
</button>

</div>

</div>

</div>

`;

});

}

renderMovies();

document
.getElementById('searchInput')
.addEventListener('input',renderMovies);

/* ADMIN LOGIN */

if(window.location.href === "https://lacaib.github.io/laacib-cinema/admin"){

const password = prompt("Enter Admin Password");

if(password === ADMIN_PASSWORD){

document.getElementById("adminPanel").style.display = "flex";

}else{

alert("Wrong Password");

}

}

function closeAdmin(){

document.getElementById("adminPanel").style.display = "none";

}

function addMovie(){

const name = document.getElementById("movieName").value;

const actors = document.getElementById("movieActors").value;

const stars = document.getElementById("movieStars").value;

const image = document.getElementById("movieImage").value;

const video = document.getElementById("movieVideo").value;

const desc = document.getElementById("movieDesc").value;

movies.unshift({
name,
actors,
stars,
image,
video,
desc
});

saveMovies();

renderMovies();

alert("Movie Added");

closeAdmin();

}