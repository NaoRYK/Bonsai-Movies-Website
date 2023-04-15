const homeButton = document.querySelector(".mark-container");


const bigMovieContainer = document.getElementById("big-movie-container");
const bigMovieContainerInfo = document.getElementById("big-movie-container-info");

const categoriesContainer = document.getElementById("categories-container")


const trendsMovieContainer = document.querySelector(".trend-movies")
const trendsViewMore = document.querySelector(".trends-view-more-button")
let contador2;
let contador = 5;


const releasesMovieContainer = document.getElementById("releases-movies");
const releasesViewMore = document.querySelector(".release-view-more-button")



//Details
const movieDetail = document.querySelector(".movie-detail");
const backArrow =  document.querySelectorAll(".back-arrow")


//Sections
const bigMovieSection = document.getElementById("big-movie")
const categoriesSection = document.getElementById("categories")
const trendsSection = document.getElementById("trends-section")
const releasesSection = document.getElementById("releases")
const sectionsArray = [bigMovieSection,categoriesSection,trendsSection,releasesSection];

//categories
const categories = document.querySelector(".categories-section");
const categoryMovieContainer = document.getElementById("category-movie-container") 
const cateogryTitle = document.getElementById("category-title");


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      'api_key': API_KEY,
      "language": "es-ES"
    },
  });

//Portada

const getBigMovie = async () =>{
    const {data} = await api(`/movie/top_rated`);

    const movies = data.results;


    let randomIndex = 0 + Math.floor(Math.random()* 19)
    bigMovieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movies[randomIndex].poster_path})`;

    bigMovieContainerInfo.innerHTML = `

    <h2 id="big-movie-name">${movies[randomIndex].original_title}</h2>
    <p id="big-movie-description">${movies[randomIndex].overview}</p>
        <div id="big-movie-button-container">
            <button id="big-movie-button">Saber más</button>
        
    `;
    
    movieEventListener()

}


//categorias
const getCategoriesPreview  = async () =>{
    const {data} = await api(`genre/movie/list`)


    const categories = data.genres;
    console.log(categories)


    categories.forEach(category => {

        categoriesContainer.innerHTML += `<div class="category"> <button class="category-button" id=${category.id}>${category.name}</button></div>`
        
    });
    const categoriesButtons = document.querySelectorAll(".category-button");
    categoriesButtons.forEach(btn => btn.addEventListener("click", ()=> location.hash = `#category=${btn.id}-${btn.textContent}`))
    

}


//Trendings
const getTrendingMovies = async () =>{
    const {data} = await api("trending/movie/week")

    const movies = data.results;
    console.log(movies)
    

    for (let index = 0; index < 4; index++) {
        let movie = movies[index];
        trendsMovieContainer.innerHTML += ` <div class="movie trend-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
        
    }
    movieEventListener()
    return movies;

}

console.log(backArrow)


const chargeNewTrendsMovies = async () =>{
    const {data} = await api("trending/movie/week")

    const movies = data.results;

    if(contador <19){
        for (let index = contador ; index < contador+ 4; index++) {
            let movie = movies[index];
            
            trendsMovieContainer.innerHTML += ` <div class="movie trend-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
            contador2 = index;
            if(contador2 >= 19){
                contador =19;
                movieEventListener()
                return
            }

        }
        movieEventListener()
        contador = contador2 +1;

    }
    else{
        alert("No se pueden cargar mas peliculas")
        return;
    }

    
}


//Lanzamientos


let contadorReleases2;
let contadorReleases = 5;
const getReleasesMovies = async () =>{
    const {data} = await api(`movie/upcoming`)
    const movies = data.results;

    for (let index = 0; index < 4; index++) {
        let movie = movies[index];
        releasesMovieContainer.innerHTML += ` <div class="movie release-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`



    }
    movieEventListener()
    
    

}

const chargeNewReleasesMovies = async () => {
    const {data} = await api(`movie/upcoming`)

    const movies = data.results;

    if(contadorReleases < 19){
        for (let index = contadorReleases; index < contadorReleases +4; index++) {
            let movie = movies[index];
            contadorReleases2 = index;
            releasesMovieContainer.innerHTML += ` <div class="movie release-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
            
            if(contadorReleases2 >= 19){
                contadorReleases =19;
                movieEventListener()
                return
            }

        }
        movieEventListener()
        contadorReleases =contadorReleases2 +1;
    }
    else{
        alert("No se pueden cargar mas peliculas")
        return;
    }
    

}


//Cargar peliculas por categoria
const getMoviesByCategory = async (genre) =>{
    const {data} = await api("/discover/movie", 
    {
        params:{
            with_genres:genre,
        },
    });
    
    console.log("data" + data)
    const movies = data.results;
    for (let index = 0; index < 20; index++) {
        let movie = movies[index];
        categoryMovieContainer.innerHTML += ` <div class="movie category-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
    }
    movieEventListener();

}


trendsViewMore.addEventListener("click", chargeNewTrendsMovies)

releasesViewMore.addEventListener("click", chargeNewReleasesMovies)

function init(){
    getCategoriesPreview();
    getTrendingMovies();
    getReleasesMovies();
    getBigMovie();
    

}

function changeMovieDetailsPage(id){
    console.log("a")
    location.hash ="#movie=";
}

window.addEventListener("load",init )


function movieEventListener(){
    
        let Movie = document.querySelectorAll(".movie");
        for (const movie of Movie) {
            movie.addEventListener("click", changeMovieDetailsPage)
        }
   

}

