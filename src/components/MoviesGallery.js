import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';

const NewMoviesGallery = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/newest_movies') // Updated the API endpoint
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Error fetching newest movies', error);
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
