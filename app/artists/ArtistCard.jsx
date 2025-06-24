"use client";
import Image from "next/image";
import Link from "next/link";

export default function ArtistCard({ artist }) {
  return (
    <Link href={`/artist/${artist.id}`} className="block">
      <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col cursor-pointer hover:ring-2 hover:ring-indigo-300">
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-indigo-700">
            {artist.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">{artist.category}</p>
          <p className="text-sm text-gray-500">📍 {artist.location}</p>
          <p className="text-sm text-gray-500">💰 {artist.feeRange}</p>
          <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
            Ask for Quote
          </button>
        </div>
      </div>
    </Link>
  );
}
