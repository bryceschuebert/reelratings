from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import pandas as pd
from imdb import IMDb
import json

app = FastAPI()

# Fetch the newest movies and their IMDb ratings
@app.get('/api/newest_movies')
async def newest_movies():
    # Get the newest movies from IMDb
    ia = IMDb()
    newest_movies = ia.get_top50_movies()[:10]  # You can adjust the number of movies as needed

    # Get movie details
    movies = []
    for movie in newest_movies:
        movie_data = ia.get_movie(movie.movieID)
        movies.append({
            "const": movie_data.getID(),
            "title": movie_data["title"],
            "year": movie_data["year"],
            "imdb_rating": movie_data["rating"],
            "genres": ", ".join(movie_data["genres"]),
            "directors": ", ".join([director["name"] for director in movie_data["directors"]])
        })

    return {"movies": movies}
