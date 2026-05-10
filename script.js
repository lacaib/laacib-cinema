const ADMIN_PASSWORD = "IPhone33@foyj45@^";

const googleBtn = document.getElementById("googleBtn");

let movies = JSON.parse(localStorage.getItem("movies")) || [
{
name:'John Wick',
actors:'Keanu Reeves',
stars:'★★★★★',
image:'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
video:'https://example.com',
desc:'Filim action ah oo aad u xiiso badan.'
}
];

function saveMovies(){
localStorage.setItem("movies",JSON.stringify(movies));
}

function renderMovies(){

const grid=document.getElementById('moviesGrid');
const search=document.getElementById('searchInput').value.toLowerCase();

grid.innerHTML='';

movies
.filter(movie => movie.name.toLowerCase().includes(search))
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
onclick="window.open('${movie.video}')">
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

function renderManager(){

const manager = document.getElementById("moviesManager");

if(!manager) return;

manager.innerHTML = "";

movies.forEach((movie,index)=>{

manager.innerHTML += `
<div style="background:#18284b;padding:10px;border-radius:10px;margin-top:10px;">
<b>${movie.name}</b>
<button onclick="deleteMovie(${index})" style="background:red;color:white;border:none;padding:8px 12px;border-radius:8px;float:right;cursor:pointer;">
Delete
</button>
</div>
`;

});
}

function deleteMovie(index){

if(confirm("Delete movie?")){
movies.splice(index,1);
saveMovies();
renderMovies();
}

}

function addMovie(){

const name = document.getElementById("movieName").value;
const actors = document.getElementById("movieActors").value;
const stars = document.getElementById("movieStars").value;
const video = document.getElementById("movieVideo").value;
const desc = document.getElementById("movieDesc").value;

const fileInput = document.getElementById("movieImageFile");
const file = fileInput.files[0];

if(!file){
alert("Dooro sawir filmka");
return;
}

const reader = new FileReader();

reader.onload = function(e){

const image = e.target.result;

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
closeAdmin();

alert("Movie Added Successfully");

};

reader.readAsDataURL(file);

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

document.getElementById('searchInput').addEventListener('input',renderMovies);