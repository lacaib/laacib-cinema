import {
db,
auth,
provider,
signInWithPopup
} from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_PASSWORD = "IPHONE33@FOYJ45@";

const moviesGrid =
document.getElementById("moviesGrid");

const deleteMoviesBox =
document.getElementById("deleteMoviesBox");

const googleBtn =
document.getElementById("googleBtn");


// GOOGLE LOGIN

googleBtn.onclick = async ()=>{

try{

const result =
await signInWithPopup(auth,provider);

googleBtn.innerHTML =
result.user.displayName;

localStorage.setItem(
"userName",
result.user.displayName
);

alert("Si Guul Leh Ayaad Ku Gashay");

}catch(err){

console.log(err);

alert("Cilad Login");

}

};


// ADMIN LOGIN

if(window.location.hash === "#admin"){

const password =
prompt("Geli Password-ka Admin");

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "flex";

}else{

alert("Password Qalad");

}

}


// CLOSE ADMIN

window.closeAdmin = ()=>{

document.getElementById(
"adminPanel"
).style.display = "none";

};


// LOAD MOVIES

async function loadMovies(){

moviesGrid.innerHTML = "";

deleteMoviesBox.innerHTML = "";

try{

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

<h3>${movie.name}</h3>

<p>
<b>Jilayaasha:</b>
${movie.actors}
</p>

<div class="stars">
${movie.stars}
</div>

<p>
${movie.desc}
</p>

<div class="video-box">

<iframe
src="${movie.video}"
frameborder="0"
allowfullscreen>
</iframe>

</div>

<div class="movie-buttons">

<a href="${movie.video}"
target="_blank">

<button class="watch-btn">
Daawo
</button>

</a>

<a href="${movie.video}"
download
target="_blank">

<button class="download-btn">
Soo Deji
</button>

</a>

</div>

</div>

</div>

`;

deleteMoviesBox.innerHTML += `

<div class="delete-item">

<span>${movie.name}</span>

<button onclick="deleteMovie('${id}')">

Tirtir

</button>

</div>

`;

});

}catch(err){

console.log(err);

alert("Cilad Soo Qaadista Filimada");

}

}


// ADD MOVIE

window.addMovie = async ()=>{

const name =
document.getElementById("movieName").value;

const actors =
document.getElementById("movieActors").value;

const stars =
document.getElementById("movieStars").value;

const desc =
document.getElementById("movieDesc").value;

const imageFile =
document.getElementById("movieImage").files[0];

const video =
document.getElementById("movieVideo").value;

if(
!name ||
!imageFile ||
!video
){

alert("Buuxi meelaha bannaan");

return;

}

try{

alert("Fadlan Sug...");

const reader = new FileReader();

reader.readAsDataURL(imageFile);

reader.onload = async ()=>{

try{

const image = reader.result;

await addDoc(
collection(db,"movies"),
{
name:name,
actors:actors,
stars:stars,
desc:desc,
image:image,
video:video,
createdAt:Date.now()
}
);

alert("Filimka Waa La Daray");

closeAdmin();

loadMovies();

}catch(error){

console.log(error);

alert("Firebase Error: " + error.message);

}

};

}catch(err){

console.log(err);

alert("Qalad Ayaa Dhacay");

}

};


// DELETE MOVIE

window.deleteMovie = async(id)=>{

const ask =
confirm("Ma tirtiraysaa filimkan?");

if(!ask) return;

try{

await deleteDoc(
doc(db,"movies",id)
);

alert("Filimka Waa La Tirtiray");

loadMovies();

}catch(err){

console.log(err);

alert("Cilad Tirtirka Filimka");

}

};


// START

window.onload = ()=>{

loadMovies();

const user =
localStorage.getItem("userName");

if(user){

googleBtn.innerHTML = user;

}

};