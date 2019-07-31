class UserMoviesController < ApplicationController
  def create
     movie=Movie.find_by(imdb:params[:id])
    if Movie.find_by(imdb:params[:id])

        UserMovie.find_by(movie_id:movie.id).destroy
        movie.destroy
        if User.find(1).movies.include?(movie)
        else
        UserMovie.create(user_id:1,movie:movie)
        end

    else
    newmovie= Movie.create(title:params[:title],imdb:params[:id],vote_average:params[:vote_average],overview:params[:overview],img_url:params[:img_url],)
    UserMovie.create(user_id:1,movie:newmovie)
    end
  end


    def userfav
      movie=User.find(1).movies
      render json: movie
    end

    def likedornot
    ans=!! Movie.find_by(imdb:(params[:imdb]).to_i)
      render json: ans
    end
end
