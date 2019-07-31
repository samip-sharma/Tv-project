class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.integer :imdb
      t.integer :vote_average
      t.string :overview
      t.string :img_url

      t.timestamps
    end
  end
end
