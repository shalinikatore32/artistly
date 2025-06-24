"use client";
import { useEffect, useState } from "react";
import ArtistCard from "./ArtistCard";
import ArtistFilters from "./FilterBlock";

export default function ArtistListingPage() {
  const [artists, setArtists] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    feeRange: "",
  });

  useEffect(() => {
    fetch("/data/artists.json")
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);

  const applyFilters = () => {
    return artists.filter((artist) => {
      const matchCategory = filters.category
        ? artist.category === filters.category
        : true;

      const matchLocation = filters.location
        ? artist.location === filters.location
        : true;

      const matchFee = (() => {
        if (!filters.feeRange) return true;

        // Remove ₹ and commas → "₹20,000 - ₹40,000" => "20000 - 40000"
        const feeStr = artist.feeRange.replace(/₹|,/g, "").trim();

        let min = 0;
        let max = 0;

        if (feeStr.includes("-")) {
          const [minStr, maxStr] = feeStr.split("-").map((s) => s.trim());
          min = parseInt(minStr);
          max = parseInt(maxStr);
        } else {
          min = max = parseInt(feeStr);
        }

        if (filters.feeRange === "low") {
          return max < 20000;
        }
        if (filters.feeRange === "mid") {
          return min <= 40000 && max >= 20000;
        }
        if (filters.feeRange === "high") {
          return min > 40000;
        }

        return true;
      })();

      return matchCategory && matchLocation && matchFee;
    });
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          🎨 Browse Talented Artists
        </h1>

        <ArtistFilters filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {applyFilters().map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </main>
  );
}
