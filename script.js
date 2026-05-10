import {
db,
auth,
provider,
signInWithPopup,
storage
} from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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

}catch(err){

alert("Cilad Login");

}

};


// ADMIN LOGIN

if(
window.location.href.includes("#admin")
){

const password =
prompt("Geli Password-ka Admin");

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "flex";

}else{

alert("Password Qalad");

window.location.hash = "";

}

}


// CLOSE ADMIN

window.closeAdmin = ()=>{

document.getElementById(
"adminPanel"
).style.display = "none";

window.location.hash = "";

};


// LOAD MOVIES

async function loadMovies(){

moviesGrid.innerHTML = "";

deleteMoviesBox.innerHTML = "";

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

<video controls width="100%" style="margin-top:15px;border-radius:12px;">

<source src="${movie.video}" type="video/mp4">

</video>

<a href="${movie.video}" download>

<button class="watch">

Download Film

</button>

</a>

</div>

</div>

`;

deleteMoviesBox.innerHTML += `

<div class="delete-item">

${movie.name}

<button onclick="deleteMovie('${id}')">

Tirtir

</button>

</div>

`;

});

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

alert("Sawirka Waa La Upload Gareynayaa...");

const imageRef = ref(
storage,
"movies/" + Date.now() + imageFile.name
);

await uploadBytes(
imageRef,
imageFile
);

const imageURL =
await getDownloadURL(imageRef);

await addDoc(
collection(db,"movies"),
{
name,
actors,
stars,
desc,
image:imageURL,
video
}
);

alert("Filimka Waa La Daray");

closeAdmin();

loadMovies();

}catch(err){

console.log(err);

alert("Firebase Error: " + err.message);

}

};


// DELETE MOVIE

window.deleteMovie = async(id)=>{

const ask =
confirm("Ma tirtiraysaa filimkan?");

if(!ask) return;

await deleteDoc(
doc(db,"movies",id)
);

alert("Filimka Waa La Tirtiray");

loadMovies();

};


// START

window.onload = ()=>{

loadMovies();

};