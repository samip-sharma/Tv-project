Rails.application.routes.draw do
  resources :user_movies, only:[:create]
  get "/users/:id/favourite", to: "user_movies#userfav"
  # resources :movies
  # resources :users
  # delete "/user/:picid/comment/:id/:where", to: "comments#destroy", as: "delete_comment"

  # http://localhost:3000/users/1/favourite
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
