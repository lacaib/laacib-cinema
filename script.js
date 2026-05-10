import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const moviesGrid = document.getElementById("moviesGrid");

const ADMIN_PASSWORD = "12345";

function youtubeEmbed(url){

if(url.includes("watch?v=")){

return url.replace("watch?v=","embed/");

}

if(url.includes("youtu.be/")){

return "https://www.youtube.com/embed/" +
url.split("youtu.be/")[1];

}

return url;

}

async function addMovie(){

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

if(!title || !image || !video){

alert("Buuxi Xogta");

return;

}

await addDoc(collection(db,"movies"),{

title,
desc,
rating,
image,
video,
download

});

alert("Filimka Waa La Daray");

location.reload();

}

async function loadMovies(){

moviesGrid.innerHTML = "";

const querySnapshot =
await getDocs(collection(db,"movies"));

querySnapshot.forEach((doc)=>{

const movie = doc.data();

moviesGrid.innerHTML += `

<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.desc}</p>

<div class="rating">
⭐ ${movie.rating}
</div>

<a href="#"
class="watch-btn"
onclick="watchMovie('${youtubeEmbed(movie.video)}')">

Daawo Filim

</a>

<a href="${movie.download}"
target="_blank"
class="download-btn">

Download

</a>

</div>

</div>

`;

});

}

window.watchMovie = function(link){

document.getElementById("videoModal").style.display =
"flex";

document.getElementById("videoFrame").src = link;

}

window.closeVideo = function(){

document.getElementById("videoModal").style.display =
"none";

document.getElementById("videoFrame").src = "";

}

window.closeAdmin = function(){

document.getElementById("adminPanel").style.display =
"none";

}

const params =
new URLSearchParams(window.location.search);

if(params.get("admin")==="true"){

const pass =
prompt("Geli Password-ka Admin");

if(pass===ADMIN_PASSWORD){

document.getElementById("adminPanel").style.display =
"block";

}else{

alert("Password Khaldan");

}

}

window.addMovie = addMovie;

loadMovies();

document.getElementById("searchInput")
.addEventListener("input",(e)=>{

const value =
e.target.value.toLowerCase();

const cards =
document.querySelectorAll(".movie-card");

cards.forEach(card=>{

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