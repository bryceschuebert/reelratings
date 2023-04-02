import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppHeader from './components/Header';
import UploadCSV from './components/UploadCSV';
import MovieList from './components/MovieList';
import axios from 'axios';

const { Content } = Layout;

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('/api/newest_movies')
      .then((response) => {
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.error('Error fetching the newest movies:', error);
      });
  }, []);

  const handleUploadSuccess = (updatedMovies) => {
    setMovies(updatedMovies);
  };

  return (
    <Layout>
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380, background: '#fff' }}>
          <UploadCSV onUploadSuccess={handleUploadSuccess} />
          {movies.length > 0 && <MovieList movies={movies} />}
        </div>
      </Content>
    </Layout>
  );
};

export default App;

