import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ADMIN_PASSWORD = "IPhone33@foyj45@^";

const moviesGrid = document.getElementById("moviesGrid");
const deleteMoviesBox = document.getElementById("deleteMoviesBox");


// =================== ADMIN PASSWORD ===================

function checkPassword() {

  const password = prompt("Enter Admin Password");

  if (password === ADMIN_PASSWORD) {

    document.getElementById("adminPanel").style.display = "flex";

  } else {

    alert("Wrong Password");

  }

}


// =================== CLOSE ADMIN ===================

function closeAdmin() {

  document.getElementById("adminPanel").style.display = "none";

}


// =================== LOAD MOVIES ===================

async function loadMovies() {

  moviesGrid.innerHTML = "";
  deleteMoviesBox.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "movies"));

  querySnapshot.forEach((docSnap) => {

    const movie = docSnap.data();

    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `

      <img src="${movie.image}" class="movie-image">

      <div class="movie-info">

        <h2>${movie.name}</h2>

        <p>${movie.actors}</p>

        <span class="stars">⭐ ${movie.stars}</span>

        <p>${movie.description}</p>

        <video controls class="movie-video">
          <source src="${movie.video}" type="video/mp4">
        </video>

      </div>

    `;

    moviesGrid.appendChild(movieCard);


    // DELETE BUTTON

    const deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete " + movie.name;

    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = async () => {

      const confirmDelete = confirm(
        "Are you sure you want to delete this movie?"
      );

      if (confirmDelete) {

        await deleteDoc(doc(db, "movies", docSnap.id));

        alert("Movie Deleted");

        loadMovies();

      }

    };

    deleteMoviesBox.appendChild(deleteBtn);

  });

}


// =================== ADD MOVIE ===================

async function addMovie() {

  const movieName = document.getElementById("movieName").value;

  const movieActors = document.getElementById("movieActors").value;

  const movieStars = document.getElementById("movieStars").value;

  const movieImage = document.getElementById("movieImage").value;

  const movieVideo = document.getElementById("movieVideo").value;

  const movieDesc = document.getElementById("movieDesc").value;


  if (
    movieName === "" ||
    movieActors === "" ||
    movieStars === "" ||
    movieImage === "" ||
    movieVideo === "" ||
    movieDesc === ""
  ) {

    alert("Fill all fields");

    return;

  }


  try {

    await addDoc(collection(db, "movies"), {

      name: movieName,

      actors: movieActors,

      stars: movieStars,

      image: movieImage,

      video: movieVideo,

      description: movieDesc

    });

    alert("Movie Added Successfully");


    document.getElementById("movieName").value = "";

    document.getElementById("movieActors").value = "";

    document.getElementById("movieStars").value = "";

    document.getElementById("movieImage").value = "";

    document.getElementById("movieVideo").value = "";

    document.getElementById("movieDesc").value = "";


    loadMovies();

  } catch (error) {

    console.log(error);

    alert("Error Adding Movie");

  }

}


// =================== EXPORT ===================

window.checkPassword = checkPassword;

window.closeAdmin = closeAdmin;

window.addMovie = addMovie;


// =================== START ===================

loadMovies();