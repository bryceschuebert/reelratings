import React from 'react';
import { Card } from 'antd';

const MovieItem = ({ movie }) => {
  return (
    <Card title={movie.title} style={{ marginBottom: 16 }}>
      <p>User's Rating: {movie.your_rating}</p>
      <p>IMDb Rating: {movie.imdb_rating}</p>
      <p>Normalized Score: {movie.normalized_score}</p>
    </Card>
  );
};

export default MovieItem;
