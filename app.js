const moviesGrid =
document.getElementById("moviesGrid");

const adminPanel =
document.getElementById("adminPanel");

const ADMIN_PASSWORD =
"IPHONE33@FOYJ45@";


// ===================
// ADMIN
// ===================

if(window.location.hash === "#admin"){

const pass =
prompt("Geli Password-ka Admin");

if(pass === ADMIN_PASSWORD){

adminPanel.style.display = "block";

}else{

alert("Password Khaldan");

window.location.href =
"https://lacaib.github.io/laacib-cinema/";

}

}


// ===================
// MOVIES STORAGE
// ===================

let movies =
JSON.parse(
localStorage.getItem("laacib_movies")
) || [];


// ===================
// SAVE MOVIES
// ===================

function saveMovies(){

localStorage.setItem(
"laacib_movies",
JSON.stringify(movies)
);

}


// ===================
// YOUTUBE EMBED
// ===================

function youtubeEmbed(url){

if(url.includes("watch?v=")){

return url.replace(
"watch?v=",
"embed/"
);

}

if(url.includes("youtu.be/")){

return "https://www.youtube.com/embed/" +
url.split("youtu.be/")[1];

}

return url;

}


// ===================
// LOAD MOVIES
// ===================

function loadMovies(){

moviesGrid.innerHTML = "";

movies.forEach((movie,index)=>{

moviesGrid.innerHTML += `

<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.desc}</p>

<div class="rating">
⭐ ${movie.rating}
</div>

<button
class="watch-btn"
onclick="watchMovie('${youtubeEmbed(movie.video)}')">

Daawo Filim

</button>

<a
href="${movie.download}"
target="_blank"
class="download-btn">

Download

</a>

${
window.location.hash === "#admin"
?

`
<button
class="delete-btn"
onclick="deleteMovie(${index})"
style="
background:red;
color:white;
padding:10px;
width:100%;
border:none;
border-radius:10px;
margin-top:10px;
cursor:pointer;
">

Tirtir

</button>
`

:

""

}

</div>

</div>

`;

});

}


// ===================
// ADD MOVIE
// ===================

window.addMovie = function(){

const title =
document.getElementById("movieTitle").value;

const desc =
document.getElementById("movieDesc").value;

const rating =
document.getElementById("movieRating").value;

const image =
document.getElementById("movieImage").value;

const video =
document.getElementById("movieVideo").value;

const download =
document.getElementById("movieDownload").value;

if(
!title ||
!image ||
!video
){

alert("Buuxi Xogta");

return;

}

movies.unshift({

title,
desc,
rating,
image,
video,
download

});

saveMovies();

loadMovies();

alert("Filimka Waa La Daray");

document.getElementById("movieTitle").value = "";
document.getElementById("movieDesc").value = "";
document.getElementById("movieRating").value = "";
document.getElementById("movieImage").value = "";
document.getElementById("movieVideo").value = "";
document.getElementById("movieDownload").value = "";

};


// ===================
// DELETE MOVIE
// ===================

window.deleteMovie = function(index){

const ask =
confirm("Ma Tirtiraysaa Filimkan?");

if(!ask) return;

movies.splice(index,1);

saveMovies();

loadMovies();

};


// ===================
// WATCH MOVIE
// ===================

window.watchMovie = function(link){

document.getElementById(
"videoModal"
).style.display = "flex";

document.getElementById(
"videoFrame"
).src = link;

};


// ===================
// CLOSE VIDEO
// ===================

window.closeVideo = function(){

document.getElementById(
"videoModal"
).style.display = "none";

document.getElementById(
"videoFrame"
).src = "";

};


// ===================
// CLOSE ADMIN
// ===================

window.closeAdmin = function(){

adminPanel.style.display = "none";

window.location.href =
"https://lacaib.github.io/laacib-cinema/";

};


// ===================
// SEARCH
// ===================

document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

const cards =
document.querySelectorAll(".movie-card");

cards.forEach((card)=>{

const title =
card.querySelector("h3")
.innerText
.toLowerCase();

card.style.display =
title.includes(value)
? "block"
: "none";

});

});


// ===================
// START
// ===================

loadMovies();