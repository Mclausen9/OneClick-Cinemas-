// File: src/App.jsx
import React, { useState, useEffect } from 'react';

const API_KEY = 'bd93071fe10b07afcc415306a97701d4';

function App() {
  const [streamItems, setStreamItems] = useState(['Example Movie 1', 'Example Movie 2']);
  const [newStreamItem, setNewStreamItem] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedMovies');
    if (saved) {
      setMovieResults(JSON.parse(saved));
    }
  }, []);

  const handleAddStreamItem = (e) => {
    e.preventDefault();
    if (newStreamItem.trim()) {
      setStreamItems([...streamItems, newStreamItem.trim()]);
      setNewStreamItem('');
    }
  };

  const handleMovieSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMovieResults(data.results);
      localStorage.setItem('savedMovies', JSON.stringify(data.results));
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovieResults([]);
    }
  };

  return (
    <>
      <div className="navbar">
        <h1>StreamList</h1>
        <div className="nav-links">
          <a href="#streamlist">Home</a>
          <a href="#movies">Movies</a>
          <a href="#cart">Cart</a>
          <a href="#about">About</a>
        </div>
      </div>

      <div className="container">
        <section id="streamlist">
          <h2>My Stream List</h2>
          <form onSubmit={handleAddStreamItem}>
            <input
              type="text"
              value={newStreamItem}
              onChange={(e) => setNewStreamItem(e.target.value)}
              placeholder="Add a movie or show"
            />
            <button type="submit">Add</button>
          </form>
          <ul>
            {streamItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section id="movies">
          <h2>Search Movies</h2>
          <form onSubmit={handleMovieSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
            />
            <button type="submit">Search</button>
          </form>
          <div id="movieResults">
            {movieResults.length === 0 ? (
              <p>No results found.</p>
            ) : (
              movieResults.map((movie) => (
                <div key={movie.id} style={{ marginBottom: '20px' }}>
                  <h3>{movie.title}</h3>
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      style={{ display: 'block', marginBottom: '10px' }}
                    />
                  )}
                  <p>{movie.overview || 'No description available.'}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section id="cart">
          <h2>Cart</h2>
          <p>This page will manage your selected stream items for later viewing. (To be developed in Week 4)</p>
        </section>

        <section id="about">
          <h2>About StreamList</h2>
          <p>
            StreamList is your personalized cloud-based movie tracker. Add shows or films you want to watch
            and manage your list from anywhere.
          </p>
        </section>
      </div>
    </>
  );
}

export default App;
