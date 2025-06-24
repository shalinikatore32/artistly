"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ArtistContext = createContext();

export function ArtistProvider({ children }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("artists") || "[]");
    setArtists(stored);
  }, []);

  const addArtist = (artist) => {
    const updated = [...artists, artist];
    setArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
  };

  return (
    <ArtistContext.Provider value={{ artists, addArtist }}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtists() {
  return useContext(ArtistContext);
}
