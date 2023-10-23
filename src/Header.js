import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';
import axios from 'axios';

function Header({ setSearchResults }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
          Authorization: 'Client-ID FTVu26AFORzu4x3JELvwnWLlod6l_h5AY39QZYIUr-0',
        },
        params: {
          query: searchQuery,
        },
      });

      setSearchResults(response.data.results);

    } catch (error) {
      console.error('Error searching images: ', error);
    }
  }, [searchQuery, setSearchResults]);
  

  // Handle search when 'Enter' is pressed
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    // Add an event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [searchQuery, handleSearch]);

  return (
    <div className="header">
      <div className="logo">Image Gallery</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Header;
