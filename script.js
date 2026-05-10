const ADMIN_PASSWORD = "IPhone33@foyj45@^";

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

renderMovies();

};

let movies = JSON.parse(localStorage.getItem("movies")) || [

{
name:'John Wick',
actors:'Keanu Reeves',
stars:'★★★★★',
image:'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
video:'https://example.com',
desc:'Filim action ah oo aad u xiiso badan.'
},

{
name:'Money Heist',
actors:'Professor - Tokyo',
stars:'★★★★☆',
image:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
video:'https://example.com',
desc:'Musalsalka tuugada ugu caansan.'
}

];

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

<div class="rating-box">

<input placeholder="Qiimee filimkan">

</div>

</div>

</div>

`;

});

}

document
.getElementById('searchInput')
.addEventListener('input',renderMovies);

if(window.location.hash === "#admin"){

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

if(name==="" || image==="" || video===""){

alert("Fill all inputs");

return;

}

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