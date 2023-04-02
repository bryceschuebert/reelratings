from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import pandas as pd
from imdb import IMDb
import json
import asyncio

app = FastAPI()

class Movie(BaseModel):
    id: str
    title: str
    year: int
    imdb_rating: float
    genres: str
    directors: str

movies = []  # Global variable to store movies

async def fetch_movies():
    ia = IMDb()
    newest_movies = ia.get_top250_movies()[:10]

    fetched_movies = []
    for movie in newest_movies:
        movie_data = ia.get_movie(movie.movieID)
        fetched_movies.append({
            "id": movie_data.getID(),
            "title": movie_data["title"],
            "year": movie_data["year"],
            "imdb_rating": movie_data["rating"],
            "genres": ", ".join(movie_data["genres"]),
            "directors": ", ".join([director["name"] for director in movie_data["directors"]])
        })

    return fetched_movies

async def update_movies():
    global movies
    movies = await fetch_movies()

async def schedule_update_movies():
    while True:
        await update_movies()
        await asyncio.sleep(86400)  # Sleep for a day (86400 seconds)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(schedule_update_movies())

@app.get('/api/newest_movies')
async def newest_movies():
    return {"movies": movies}

@app.get('/api/search_movies')
async def search_movies(query: str):
    # Implement the search functionality using the IMDb library
    ia = IMDb()
    movies = ia.search_movie(query)

    # Process the movies and return the relevant data
    return {"movies": process_movies(movies)}


