import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import ImageGallery from './ImageGallery';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <Header setSearchResults={setSearchResults} />
      <ImageGallery searchResults={searchResults} />
    </div>
  );
}

export default App;
