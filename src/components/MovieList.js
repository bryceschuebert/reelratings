import React from 'react';
import MovieItem from './MovieItem';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <MovieItem key={movie.const} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
