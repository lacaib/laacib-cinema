import { db, storage } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const ADMIN_PASSWORD = "IPhone33@foyj45@^";

const moviesGrid = document.getElementById("moviesGrid");

const deleteMoviesBox = document.getElementById("deleteMoviesBox");

const googleBtn = document.getElementById("googleBtn");

googleBtn.onclick = () => {

let user = localStorage.getItem("laacibUser");

if(!user){

const name = prompt("Geli magacaaga");

if(name){

localStorage.setItem("laacibUser",name);

googleBtn.innerHTML = name;

}

}else{

googleBtn.innerHTML = user;

}

};

window.onload = ()=>{

loadMovies();

const user = localStorage.getItem("laacibUser");

if(user){

googleBtn.innerHTML = user;

}

};

async function loadMovies(){

moviesGrid.innerHTML = "";

deleteMoviesBox.innerHTML = "";

const querySnapshot = await getDocs(collection(db,"movies"));

querySnapshot.forEach((docSnap)=>{

const movie = docSnap.data();

const id = docSnap.id;

moviesGrid.innerHTML += `

<div class="movie-card">

<img src="${movie.image}">

<div class="movie-info">

<h3>${movie.name}</h3>

<p><b>Actors:</b> ${movie.actors}</p>

<div class="stars">${movie.stars}</div>

<p>${movie.desc}</p>

<div class="actions">

<button class="watch"
onclick="window.open('${movie.video}')">
Watch
</button>

</div>

</div>

</div>

`;

deleteMoviesBox.innerHTML += `

<div class="delete-item">

${movie.name}

<button onclick="deleteMovie('${id}')">
Delete
</button>

</div>

`;

});

}

window.deleteMovie = async function(id){

const ask = confirm("Delete this movie?");

if(!ask) return;

await deleteDoc(doc(db,"movies",id));

alert("Movie Deleted");

loadMovies();

}

window.addMovie = async function(){

const name = document.getElementById("movieName").value;

const actors = document.getElementById("movieActors").value;

const stars = document.getElementById("movieStars").value;

const desc = document.getElementById("movieDesc").value;

const imageFile = document.getElementById("movieImage").files[0];

const videoFile = document.getElementById("movieVideo").files[0];

if(
!name ||
!imageFile ||
!videoFile
){

alert("Fill all inputs");

return;

}

try{

alert("Uploading...");

const imageRef = ref(
storage,
"images/" + Date.now() + imageFile.name
);

await uploadBytes(imageRef,imageFile);

const imageURL = await getDownloadURL(imageRef);

const videoRef = ref(
storage,
"videos/" + Date.now() + videoFile.name
);

await uploadBytes(videoRef,videoFile);

const videoURL = await getDownloadURL(videoRef);

await addDoc(collection(db,"movies"),{

name,
actors,
stars,
desc,
image:imageURL,
video:videoURL

});

alert("Movie Added Successfully");

closeAdmin();

loadMovies();

}catch(err){

console.log(err);

alert("Upload Error");

}

}

if(window.location.hash === "#admin"){

const password = prompt("Enter Admin Password");

if(password === ADMIN_PASSWORD){

document.getElementById("adminPanel").style.display = "flex";

}else{

alert("Wrong Password");

}

}

window.closeAdmin = function(){

document.getElementById("adminPanel").style.display = "none";

}