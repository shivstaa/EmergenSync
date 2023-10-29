import React, { useState, useEffect } from 'react';

function FindRoom() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          postLocation(loc);
        },
        () => {
          setError('Unable to retrieve your location');
        }
      );
    }
  }, []);

  const postLocation = async (loc) => {
    try {
      const response = await fetch('http://localhost:3000/dummy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loc),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();  // assuming your backend returns json
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch:', error);
    }
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {location && (
        <div>
          Latitude: {location.latitude}
          <br />
          Longitude: {location.longitude}
        </div>
      )}
    </div>
  );
}

export default FindRoom;
