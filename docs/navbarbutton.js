let home=document.querySelector(".button-on-top")

   // event listners//////////////////////////////////////////////////////
   home.addEventListener("click",(event)=>{
     Adaptor.fetchMovies()

   })

   let fav=document.querySelector(".favourite-movie")

   fav.addEventListener("click",(event)=>{
     let promise=Adaptor.getFavouriteMovies()
     .then(function(data){
       loopingFavMovie(data)
     })

   })


let form=document.querySelector(".search-button")
form.addEventListener("submit",function(event){
  event.preventDefault()
  let value=form.querySelector(".text-box").value
  let neededWord=value.replace(" ","%20");
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=a3cd5d00d31f044f243447255913e870&language=en-US&query=${neededWord}&page=1&include_adult=false`)
  .then(resp => resp.json())
  .then(function(data){
    let container=document.querySelector(".container")
    container.innerHTML=""
    data.results.forEach(movie=>{
      // slappingSearchResult(movie)

      new MovieList(movie)
    })
  })
})







function loopingFavMovie(movies){
  let container=document.querySelector(".container")
  container.innerHTML=""
  let div=document.createElement("div")
  div.className="all-fav-list"
  container.append(div)

  movies.forEach(function(movie){
    new EachFavouriteMovie(movie)
  })

}
