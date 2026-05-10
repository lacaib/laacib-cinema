import {
db,
auth,
provider,
signInWithPopup,
signOut
} from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_PASSWORD = "IPhone33@foyj45@^";

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

googleBtn.innerHTML = user.displayName;

localStorage.setItem(
"userName",
user.displayName
);

}catch(err){

console.log(err);

alert("Login Error");

}

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

<p><b>Actors:</b> ${movie.actors}</p>

<div class="stars">
${movie.stars}
</div>

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


// ================= ADMIN =================

adminBtn.onclick = ()=>{

const password =
prompt("Enter Admin Password");

if(password === ADMIN_PASSWORD){

document.getElementById(
"adminPanel"
).style.display = "flex";

}else{

alert("Wrong Password");

}

};


// ================= CLOSE ADMIN =================

window.closeAdmin = ()=>{

document.getElementById(
"adminPanel"
).style.display = "none";

};


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

alert("Fill all inputs");

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

alert("Movie Added");

closeAdmin();

loadMovies();

};

};


// ================= DELETE MOVIE =================

window.deleteMovie = async(id)=>{

const ask =
confirm("Delete Movie?");

if(!ask) return;

await deleteDoc(
doc(db,"movies",id)
);

alert("Movie Deleted");

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