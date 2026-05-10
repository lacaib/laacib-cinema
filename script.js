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

}catch(err){

alert("Cilad Login");

}

};


// ADMIN LOGIN

const isAdminPage =
window.location.href.includes("#admin");

if(isAdminPage){

setTimeout(()=>{

const password =
prompt("Geli Password-ka Admin");

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "flex";

// حذف #admin من الرابط
window.history.replaceState(
{},
document.title,
window.location.pathname
);

}else{

alert("Password Qalad");

// حذف #admin أيضاً
window.history.replaceState(
{},
document.title,
window.location.pathname
);

}

},500);

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

Soo Daji Filimka

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

const reader = new FileReader();

reader.readAsDataURL(imageFile);

reader.onload = async ()=>{

const image = reader.result;

await addDoc(
collection(db,"movies"),
{
name,
actors,
stars,
desc,
image,
video
}
);

alert("Filimka Waa La Daray");

document.getElementById("movieName").value = "";
document.getElementById("movieActors").value = "";
document.getElementById("movieStars").value = "";
document.getElementById("movieDesc").value = "";
document.getElementById("movieImage").value = "";
document.getElementById("movieVideo").value = "";

loadMovies();

};

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