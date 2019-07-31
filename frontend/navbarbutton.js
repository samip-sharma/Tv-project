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


function loopingFavMovie(movies){
  let container=document.querySelector(".container")
  container.innerHTML=""
  movies.forEach(function(movie){
    new EachFavouriteMovie(movie)
  })

}
