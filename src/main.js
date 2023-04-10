const bigMovieContainer = document.getElementById("big-movie-container");
const bigMovieContainerInfo = document.getElementById("big-movie-container-info");

const trendsMovieContainer = document.querySelector(".trend-movies")
const trendsViewMore = document.querySelector(".trends-view-more-button")
let contador2;
let contador = 5;


const releasesMovieContainer = document.getElementById("releases-movies");
const releasesViewMore = document.querySelector(".release-view-more-button")


//Portada

const getBigMovie = async () =>{
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)

    const data = await res.json();
    const movies = data.results;


    let randomIndex = 0 + Math.floor(Math.random()* 19)
    bigMovieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movies[randomIndex].poster_path})`;

    bigMovieContainerInfo.innerHTML = `
    <div id="big-movie-container-info">
    <h2 id="big-movie-name">${movies[randomIndex].original_title}</h2>
    <p id="big-movie-description">${movies[randomIndex].overview}</p>
        <div id="big-movie-button-container">
            <button id="big-movie-button">Saber más</button>
        </div>
    `;
    


}


//Trendings
const getTrendingMovies = async () =>{
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key="+ API_KEY)
    const data = await res.json();
    const movies = data.results;
    

    for (let index = 0; index < 4; index++) {
        let movie = movies[index];
        trendsMovieContainer.innerHTML += ` <div class="movie trend-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
        
    }
    return movies;

}



const chargeNewTrendsMovies = async () =>{
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key="+ API_KEY)
    const data = await res.json();
    const movies = data.results;

    if(contador <19){
        for (let index = contador ; index < contador+ 4; index++) {
            let movie = movies[index];
            
            trendsMovieContainer.innerHTML += ` <div class="movie trend-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
            contador2 = index;
            if(contador2 >= 19){
                contador =19;
                return
            }

        }
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
    const res = await fetch(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await res.json();
    const movies = data.results;

    for (let index = 0; index < 4; index++) {
        let movie = movies[index];
        releasesMovieContainer.innerHTML += ` <div class="movie release-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`



    }
    

}

const chargeNewReleasesMovies = async () => {
    const res = await fetch(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await res.json();
    const movies = data.results;

    if(contadorReleases < 19){
        for (let index = contadorReleases; index < contadorReleases +4; index++) {
            let movie = movies[index];
            contadorReleases2 = index;
            releasesMovieContainer.innerHTML += ` <div class="movie release-movie"> <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}" class="movie-img"></div>`
            if(contadorReleases2 >= 19){
                contadorReleases =19;
                return
            }

        }
        contadorReleases =contadorReleases2 +1;
    }
    else{
        alert("No se pueden cargar mas peliculas")
        return;
    }
    

}


trendsViewMore.addEventListener("click", chargeNewTrendsMovies)

releasesViewMore.addEventListener("click", chargeNewReleasesMovies)

function init(){
    getBigMovie();
    getTrendingMovies();
    getReleasesMovies();

}
window.addEventListener("load",init )