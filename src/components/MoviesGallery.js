import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';

const NewMoviesGallery = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/latest_movies')
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Error fetching latest movies', error);
      });
  }, []);

  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.const} movie={movie} />
      ))}
    </div>
  );
};

export default NewMoviesGallery;
