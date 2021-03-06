// fetch all movie




class Adaptor {
  static fetchMovies() {
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=a3cd5d00d31f044f243447255913e870&language=en-US&page=1")
      .then(resp => resp.json())
      .then(function(data) {
        let container = document.querySelector(".container")
        container.innerHTML = ""
        data.results.forEach(function(movie) {

          new MovieList(movie)
        })
      })
  }

  static fetchTrailer(url) {
    return fetch(url)
      .then(resp => resp.json())
  }


  static getFavouriteMovies() {
    return fetch("https://testingthisonething.herokuapp.com/users/1/favourite")
      .then(resp => resp.json())

  }

  static fetchSimilarMovies(id){
    return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=a3cd5d00d31f044f243447255913e870&language=en-US&page=1`)
    .then(resp => resp.json())
  }


  static fetchIfLiked(id) {
    return fetch(`https://testingthisonething.herokuapp.com/users/1/liked/${id}`)
      .then(resp => resp.json())
    // .then(console.log)
  }
}

Adaptor.fetchMovies()





class EachFavouriteMovie {
  constructor(movie) {
    this.title = movie.title
    this.vote_average = movie.vote_average
    this.overview = movie.overview
    this.poster_path = movie.img_url
    this.id = movie.imdb
    // new MovieDetail(this)
    this.slappingFavMovies()
  }

  slappingFavMovies() {
    let favList = document.querySelector(".all-fav-list")
    let div = document.createElement("div")
    div.className="inlinetry"

    div.innerHTML = `
      <a href="#" class="favourite-img">
      <img  src=https://image.tmdb.org/t/p/w500/${this.poster_path}></a>
      `
    favList.append(div)
    let link = div.querySelector("a")


    // event listner
    link.addEventListener("click", event => {
      new MovieDetail(this)

    })

  }
}









// fetch all movie end
class MovieList {
  constructor(movie) {
    this.img_url = movie.poster_path
    this.id = movie.id
    this.slappingEachMovie(movie)
  }


  slappingEachMovie(movie, i) {
    if (!this.img_url) return undefined;
    let container = document.querySelector(".container")
    let div = document.createElement("div")
    div.class = "movie-list"
    div.innerHTML = `
      <div class="each-img">
          <img src=https://image.tmdb.org/t/p/w500/${this.img_url}>
        </div>
    `
    container.append(div)
    let img = div.querySelector("img")
    img.addEventListener("click", (event) => {
      new MovieDetail(movie)
    })

  }

}






class MovieDetail {
  constructor(movie) {

    this.title = movie.title
    this.vote_average = movie.vote_average
    this.overview = movie.overview
    this.img_url = movie.poster_path
    this.id = movie.id
    this.slappingMovieDetail()
  }

  slappingMovieDetail() {
    let container = document.querySelector(".container")
    container.innerHTML = '';
    let imgUrl = `https://image.tmdb.org/t/p/w500/${this.img_url}`
    container.innerHTML = `

      <div class="detail-img">
          <img src=${imgUrl} alt=${this.title}/>
          </div>
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


          <div>
          <button class="button button-like">
            <i class="fa fa-heart"></i>
            <span>Like</span>
          </button>
          </div>
          </div>


      <div class="trailer">
      </div>

      <div class="show">
          <h4>${this.title}</h4>
          <p>${this.overview}</p>
      </div>

      <div class="similar-movies"></div>
    `


    // trailer part

    let trailerUrl = `https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=a3cd5d00d31f044f243447255913e870&language=en-US`
    Adaptor.fetchTrailer(trailerUrl)
      .then(data => {

        if (data.results[0]) {
          this.youtube = data.results[0].key
          let detailImagediv = document.querySelector(".detail-img")

          let videoDiv = document.querySelector(".trailer")
          videoDiv.innerHTML = `
      <iframe width="820" height="610"
      src=https://www.youtube.com/embed/${this.youtube}>
      </iframe>
      `
          detailImagediv.append(videoDiv)
        }
      })

    // like button logic

    let likeButton = document.querySelector(".button-like")
    Adaptor.fetchIfLiked(this.id)
      .then(ans => {

        if (ans) {
          likeButton.classList.add("liked")
        }
        likeButton.addEventListener("click", (event) => {
          this.makePostReqTolike()
          likeButton.classList.toggle("liked");
        })
      })



        // similar movies fetch and slap

      Adaptor.fetchSimilarMovies(this.id)
      .then(this.loopingSimilarMovies.bind(this))
  }



  loopingSimilarMovies(data){
    data.results.forEach(movie=>{
      this.slappingSimilarMovie(movie)
    })
  }


  slappingSimilarMovie(movie){
    let similarMovieDiv=document.querySelector(".similar-movies")
      let divEachSimilar=document.createElement("div")
          divEachSimilar.className="each-similar-movie"
          divEachSimilar.innerHTML= `
        <img class="similar-image" src=https://image.tmdb.org/t/p/w500/${movie.poster_path}>
    `
    similarMovieDiv.append(divEachSimilar)

    let similarImg = divEachSimilar.querySelector(".similar-image")
    //
      similarImg.addEventListener("click", (event) => {
      console.log(event)
      // debugger
      new MovieDetail(movie)
    })



  }




  makePostReqTolike() {
    fetch("https://testingthisonething.herokuapp.com/user_movies", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(this)
    })
  }

}
