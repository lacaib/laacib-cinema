import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const moviesGrid =
document.getElementById("moviesGrid");

const adminPanel =
document.getElementById("adminPanel");

const ADMIN_PASSWORD =
"IPHONE33@FOYJ45@";


// =========================
// ADMIN LOGIN
// =========================

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


// =========================
// YOUTUBE EMBED
// =========================

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


// =========================
// ADD MOVIE
// =========================

window.addMovie = async function(){

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

try{

await addDoc(
collection(db,"movies"),
{
title,
desc,
rating,
image,
video,
download
}
);

alert("Filimka Waa La Daray");

document.getElementById("movieTitle").value = "";
document.getElementById("movieDesc").value = "";
document.getElementById("movieRating").value = "";
document.getElementById("movieImage").value = "";
document.getElementById("movieVideo").value = "";
document.getElementById("movieDownload").value = "";

loadMovies();

}catch(err){

console.log(err);

alert("Firebase Error");

}

};


// =========================
// LOAD MOVIES
// =========================

async function loadMovies(){

moviesGrid.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"movies")
);

querySnapshot.forEach((docSnap)=>{

const movie = docSnap.data();

const id = docSnap.id;

moviesGrid.innerHTML += `

<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>${movie.desc}</p>

<div class="rating">
⭐ ${movie.rating || "5"}
</div>

<button
class="watch-btn"
onclick="watchMovie('${youtubeEmbed(movie.video)}')">

Daawo Filim

</button>

<a
href="${movie.download || movie.video}"
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
onclick="deleteMovie('${id}')">

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


// =========================
// DELETE MOVIE
// =========================

window.deleteMovie = async function(id){

const ask =
confirm("Ma Tirtiraysaa Filimkan?");

if(!ask) return;

try{

await deleteDoc(
doc(db,"movies",id)
);

alert("Filimka Waa La Tirtiray");

loadMovies();

}catch(err){

console.log(err);

alert("Delete Error");

}

};


// =========================
// WATCH MOVIE
// =========================

window.watchMovie = function(link){

document.getElementById(
"videoModal"
).style.display = "flex";

document.getElementById(
"videoFrame"
).src = link;

};


// =========================
// CLOSE VIDEO
// =========================

window.closeVideo = function(){

document.getElementById(
"videoModal"
).style.display = "none";

document.getElementById(
"videoFrame"
).src = "";

};


// =========================
// CLOSE ADMIN
// =========================

window.closeAdmin = function(){

adminPanel.style.display = "none";

window.location.href =
"https://lacaib.github.io/laacib-cinema/";

};


// =========================
// SEARCH
// =========================

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


// =========================
// START
// =========================

loadMovies();