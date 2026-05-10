const ADMIN_PASSWORD = "IPhone33@foyj45@^";

const googleBtn = document.getElementById("googleBtn");

let movies = JSON.parse(localStorage.getItem("movies")) || [

{
name:'John Wick',
actors:'Keanu Reeves',
stars:'★★★★★',
image:'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
video:'https://www.w3schools.com/html/mov_bbb.mp4',
desc:'Filim action ah oo aad u xiiso badan.'
}

];

function saveMovies(){

localStorage.setItem("movies",JSON.stringify(movies));

}

function renderMovies(){

const grid = document.getElementById('moviesGrid');

const search = document.getElementById('searchInput')
.value.toLowerCase();

grid.innerHTML = '';

movies
.filter(movie =>
movie.name.toLowerCase().includes(search)
)

.forEach((movie,index)=>{

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
onclick="watchMovie('${movie.video}')">
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

renderManager();

}

function watchMovie(video){

const newWindow = window.open("");

newWindow.document.write(`

<style>
body{
margin:0;
background:black;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}
video{
width:100%;
height:100%;
object-fit:contain;
}
</style>

<video controls autoplay>
<source src="${video}">
</video>

`);

}

function renderManager(){

const manager = document.getElementById("moviesManager");

if(!manager) return;

manager.innerHTML = "";

movies.forEach((movie,index)=>{

manager.innerHTML += `

<div style="
background:#18284b;
padding:10px;
margin-top:10px;
border-radius:10px;
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
">

<span>${movie.name}</span>

<button onclick="deleteMovie(${index})"
style="
background:red;
color:white;
border:none;
padding:8px 14px;
border-radius:8px;
cursor:pointer;
">
Delete
</button>

</div>

`;

});

}

function deleteMovie(index){

const confirmDelete = confirm("Ma hubtaa inaad delete gareyneyso filmkaan?");

if(confirmDelete){

movies.splice(index,1);

saveMovies();

renderMovies();

alert("Movie Deleted");

}

}

function addMovie(){

const name = document.getElementById("movieName").value;

const actors = document.getElementById("movieActors").value;

const stars = document.getElementById("movieStars").value;

const desc = document.getElementById("movieDesc").value;

const imageFile = document.getElementById("movieImageFile").files[0];

const videoFile = document.getElementById("movieVideoFile").files[0];

if(!name || !imageFile || !videoFile){

alert("Fill all inputs");

return;

}

const imageReader = new FileReader();

imageReader.onload = function(e){

const image = e.target.result;

const videoReader = new FileReader();

videoReader.onload = function(v){

const video = v.target.result;

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

alert("Movie Added Successfully");

closeAdmin();

};

videoReader.readAsDataURL(videoFile);

};

imageReader.readAsDataURL(imageFile);

}

function closeAdmin(){

document.getElementById("adminPanel").style.display = "none";

}

if(window.location.hash === "#admin"){

const password = prompt("Enter Admin Password");

if(password === ADMIN_PASSWORD){

document.getElementById("adminPanel").style.display = "flex";

}else{

alert("Wrong Password");

}

}

window.onload = ()=>{

renderMovies();

const user = localStorage.getItem("laacibUser");

if(user){

googleBtn.innerHTML = `

<img src="https://cdn-icons-png.flaticon.com/512/300/300221.png">

<span>${user}</span>

`;

}

};

googleBtn.onclick = () => {

let user = localStorage.getItem("laacibUser");

if(!user){

const name = prompt("Geli magacaaga");

if(name){

localStorage.setItem("laacibUser",name);

location.reload();

}

}

};

document
.getElementById('searchInput')
.addEventListener('input',renderMovies);