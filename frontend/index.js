// fetch all movie




class Adaptor{
  static fetchMovies(){
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=a3cd5d00d31f044f243447255913e870&language=en-US&page=1")
    .then(resp => resp.json())
    .then(function(data){
      let container=document.querySelector(".container")
      container.innerHTML=""
      data.results.forEach(function(movie,i){

        new MovieList(movie,i)
      })
    })
  }

  static fetchTrailer(url){
    return  fetch(url)
    .then(resp=>resp.json())
  }


  static getFavouriteMovies(){
    return fetch("http://localhost:3000/users/1/favourite")
    .then(resp => resp.json())

  }
}

Adaptor.fetchMovies()





class EachFavouriteMovie{
  constructor(data){
    this.title=data.name
    this.imdb=data.imdb
    this.id=data.id
    this.slappingFavMovies()
  }

 static slappingFavMovies(){

   debugger
 }
}













// fetch all movie end
class MovieList{
  constructor(movie,i){
    this.img_url=movie.poster_path
    this.id=movie.id
    this.slappingEachMovie(movie,i)
  }


  slappingEachMovie(movie,i){
    let container=document.querySelector(".container")
    let div=document.createElement("div")
    div.class="movie-list"
      div.innerHTML=`
      <div class="each-img">
          <img src=https://image.tmdb.org/t/p/w500/${this.img_url}>
        </div>
    `
    container.append(div)
    let img=div.querySelector("img")
    img.addEventListener("click",(event)=> {
      new MovieDetail(movie)
    })

  }

}






class MovieDetail{
  constructor(movie){
    this.title=movie.title
    this.vote_average=movie.vote_average
    this.overview=movie.overview
    this.img_url=movie.poster_path
    this.id=movie.id
    this.slappingMovieDetail()
  }

  slappingMovieDetail(){
    let container=document.querySelector(".container")
    container.innerHTML = '';
        let imgUrl=`https://image.tmdb.org/t/p/w500/${this.img_url}`
        container.innerHTML=`
      <div class="image-n-rating">
          <img src=${imgUrl} alt=${this.title}/>

          <div class="grid">
          <section>
            <h2>Average rating</h2>
            <svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle class="circle-chart__background" stroke="#efefef" stroke-width="2" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
              <circle class="circle-chart__circle" stroke="#00acc1" stroke-width="2" stroke-dasharray="${this.vote_average*10},100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="15.91549431" />
              <g class="circle-chart__info">
                <text class="circle-chart__percent" x="16.91549431" y="15.5" alignment-baseline="central" text-anchor="middle" font-size="8">${this.vote_average*10}%</text>
              </g>
            </svg>
          </section>
          </div>
      </div>

      <div class="trailer">
      </div>

      <div class="show">
          <h4>${this.title}</h4>
          <p>${this.overview}</p>

        <button class="like">like</button>
        <button class="delete">home</button>
      </div>
    `

    let trailerUrl=`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=a3cd5d00d31f044f243447255913e870&language=en-US`
    Adaptor.fetchTrailer(trailerUrl)
    .then(data=> {
      this.youtube= data.results[0].key
      let videoDiv=document.querySelector(".trailer")
      videoDiv.innerHTML=`
      <iframe width="420" height="315"
      src=https://www.youtube.com/embed/${this.youtube}>
      </iframe>
      `
      container.append(videoDiv)
    })

    let likeButton=document.querySelector(".like")


    likeButton.addEventListener("click",(event)=>{
      // console.log(this)
      this.makePostReqTolike()
    })
  }

  goToHome(){

  }






  makePostReqTolike(){
    fetch("http://localhost:3000/user_movies",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "accept":"application/json"
      },
      body:JSON.stringify(this)
    })
  }

}
