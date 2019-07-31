class UserMoviesController < ApplicationController
  def create
     movie=Movie.find_by(imdb:params[:id])
    if Movie.find_by(imdb:params[:id])
        if User.find(1).movies.include?(movie)
        else
        UserMovie.create(user_id:1,movie:movie)
        end

    else
    newmovie= Movie.create(name:params[:title],imdb:params[:id])
    UserMovie.create(user_id:1,movie:newmovie)
    end
  end


    def userfav
      movie=User.find(1).movies
      render json: movie
    end
end
