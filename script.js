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


// ================= PASSWORD =================

const ADMIN_PASSWORD = "IPHONE33@FOYJ45@";


// ================= ELEMENTS =================

const moviesGrid =
document.getElementById("moviesGrid");

const deleteMoviesBox =
document.getElementById("deleteMoviesBox");

const googleBtn =
document.getElementById("googleBtn");

const adminBtn =
document.getElementById("adminBtn");


// ================= GOOGLE LOGIN =================

googleBtn.onclick = async ()=>{

try{

const result =
await signInWithPopup(auth,provider);

const user = result.user;

googleBtn.innerHTML =
user.displayName;

localStorage.setItem(
"userName",
user.displayName
);

}catch(err){

console.log(err);

alert("Cilad Login");

}

};


// ================= ADMIN =================

adminBtn.onclick = ()=>{

const password =
prompt("Geli Password-ka Admin");

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "flex";

}else{

alert("Password Qalad");

}

};


// ================= CLOSE ADMIN =================

window.closeAdmin = ()=>{

document.getElementById(
"adminPanel"
).style.display = "none";

};


// ================= LOAD MOVIES =================

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

<div class="actions">

<button class="watch"
onclick="window.open('${movie.video}')">

Daawo Filimka

</button>

</div>

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


// ================= ADD MOVIE =================

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

alert("Fadlan buuxi meelaha bannaan");

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

closeAdmin();

loadMovies();

};

};


// ================= DELETE MOVIE =================

window.deleteMovie = async(id)=>{

const ask =
confirm("Ma rabtaa inaad tirtirto filimkan?");

if(!ask) return;

await deleteDoc(
doc(db,"movies",id)
);

alert("Filimka Waa La Tirtiray");

loadMovies();

};


// ================= START =================

window.onload = ()=>{

loadMovies();

const user =
localStorage.getItem("userName");

if(user){

googleBtn.innerHTML = user;

}

};


// ================= WEBSITE =================

console.log(
"Website:",
"https://lacaib.github.io/laacib-cinema/"
);