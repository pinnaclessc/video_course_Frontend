import React, { useState, useEffect } from 'react';

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/playlists');
      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h2>Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlists;
