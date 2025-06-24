"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useArtists } from "../context/ArtistContext";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
  const { artists } = useArtists();
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4 text-white font-semibold text-sm">
              <Link
                href="/dashboard"
                className="bg-gray-900 px-3 py-2 rounded-md"
              >
                Dashboard
              </Link>
              <Link
                href="/onboard"
                className="hover:text-indigo-300 transition"
              >
                Onboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
              >
                Logout
              </button>
              <img
                className="h-8 w-8 rounded-full hidden sm:block"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="profile"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            🎛️ Manager Dashboard
          </h1>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 pb-12">
        {/* ARTIST TABLE */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">🎤 Artist Submissions</h2>
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-indigo-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-indigo-800">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-indigo-800">
                    Category
                  </th>
                  <th className="px-4 py-3 font-semibold text-indigo-800">
                    City
                  </th>
                  <th className="px-4 py-3 font-semibold text-indigo-800">
                    Fee
                  </th>
                  <th className="px-4 py-3 font-semibold text-indigo-800">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {artists.length > 0 ? (
                  artists.map((artist, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{artist.name}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {Array.isArray(artist.category)
                          ? artist.category.join(", ")
                          : artist.category}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {artist.location}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {artist.feeRange}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/explore/${artist.id}`}
                          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-6">
                      No artist submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOOKINGS TABLE */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">📩 Booking Requests</h2>
          <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-purple-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-purple-800">
                    Artist
                  </th>
                  <th className="px-4 py-3 font-semibold text-purple-800">
                    Requester
                  </th>
                  <th className="px-4 py-3 font-semibold text-purple-800">
                    Event Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-purple-800">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map((b, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-gray-700">
                        {b.artistName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{b.requester}</td>
                      <td className="px-4 py-3 text-gray-700">{b.eventDate}</td>
                      <td className="px-4 py-3 text-gray-700">{b.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-500 py-6">
                      No booking requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
