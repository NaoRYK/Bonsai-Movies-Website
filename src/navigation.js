window.addEventListener("hashchange", navigator, false)
window.addEventListener("DOMContentLoaded", navigator, false)






function navigator(){
    
    if(location.hash.startsWith('#search='))
    {
        searchPage()
        
    }
    else if( location.hash.startsWith("#movie=")){
        
        
        movieDetailsPage()
        if(location.hash ==="#movie="){
            homePage();
        }
        
    }
    else if( location.hash.startsWith("#category=")){
        categoryPage()
    }
    else{
        homePage()
    }

}

function homePage(){
    location.hash = ("#home");
    

    movieDetail.classList.add("hidden")
    categories.classList.add("hidden")
    searchSection.classList.add("hidden");
    categoryMovieContainer.innerHTML ="";
    sectionsArray.forEach( e => e.classList.remove("hidden"))

    movieEventListener();
    searchForm.reset();
    window.scrollTo(0,0)
}
function searchPage(){
    
    searchSection.classList.remove("hidden");
    movieDetail.classList.add("hidden")
    categories.classList.add("hidden")
    sectionsArray.forEach( e => e.classList.add("hidden"))
    const [_, searchValue] = location.hash.split("=")
    searchedTitle.innerHTML = "Resultados de "+ searchValue;
    getSearchedMovie(searchValue);
    window.scrollTo(0,0)
}
function categoryPage(){

    sectionsArray.forEach( e =>{
        
        e.classList.add("hidden")})
    movieDetail.classList.add("hidden")
    searchSection.classList.add("hidden");
    categories.classList.remove("hidden");

    const [_,categoryData] = location.hash.split('=');
    const [categoryID,CategoryName ] = categoryData.split("-");
    cateogryTitle.innerHTML= CategoryName;
    if(cateogryTitle.innerHTML === "Acci%C3%B3n"){
        cateogryTitle.innerHTML = "Acción"
    }
    else if(cateogryTitle.innerHTML === "Animaci%C3%B3n"){
        cateogryTitle.innerHTML = "Animación"
    }
    else if(cateogryTitle.innerHTML === "Fantas%C3%ADa"){
        cateogryTitle.innerHTML = "Fantasía"
    }
    else if(cateogryTitle.innerHTML === "M%C3%BAsica"){
        cateogryTitle.innerHTML = "Música"
    }
    else if(cateogryTitle.innerHTML === "Ciencia%20ficci%C3%B3n"){
        cateogryTitle.innerHTML = "Ciencia ficción"
    }
    else if(cateogryTitle.innerHTML === "B%C3%A9lica"){
        cateogryTitle.innerHTML = "Bélica"
    }
    
    getMoviesByCategory(categoryID);
    window.scrollTo(0,0)
    searchForm.reset();
}
function movieDetailsPage(){
    sectionsArray.forEach( e =>{
         
         e.classList.add("hidden")})
    movieDetail.classList.remove("hidden")
    categories.classList.add("hidden")
    searchSection.classList.add("hidden");
    
    movieContainerGenres.innerHTML ="";
    const [_,movieID] = location.hash.split('=');
    chargeNewMovieDetailsPage(movieID);
    getSimilarMovies(movieID)
    window.scrollTo(0,0)
    searchForm.reset();


}

function searchMovie(){
    
    const search = searchInput.value;

    
    if(search != ""){
        location.hash = "#search=" + search;

        searchForm.reset();
    }   
    else{
        alert("Ingrese una busqueda valida")
    }



}

backArrow.forEach(e=> e.addEventListener("click", ()=>{

    location.hash = window.history.back();
    window.scrollTo(0,0)
}))

homeButton.addEventListener("click", homePage);


searchButton.addEventListener("click", searchMovie)