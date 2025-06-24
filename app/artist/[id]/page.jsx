"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch("/data/artists.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id?.toString() === id);
        setArtist(found);
      });
  }, [id]);

  const onSubmitBooking = (e) => {
    e.preventDefault();

    const booking = {
      artistId: artist.id,
      artistName: artist.name,
      eventDate: e.target.eventDate.value,
      requester: e.target.requester.value,
      message: e.target.message.value,
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    toast.success("Booking request sent successfully!");
    router.push("/artists");
    e.target.reset();
  };

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading artist details...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 px-4 py-10">
      <Toaster position="top-center" />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={artist.image || "/images/default-artist.jpg"}
            alt={artist.name}
            width={200}
            height={200}
            className="rounded-full object-cover border-4 border-indigo-500"
          />

          <div>
            <h1 className="text-4xl font-bold text-indigo-700 mb-2">
              {artist.name}
            </h1>
            <p className="text-gray-700 italic mb-4">{artist.bio}</p>

            <div className="flex flex-wrap gap-3 text-sm text-white">
              {[
                ...(Array.isArray(artist.category)
                  ? artist.category
                  : [artist.category]),
              ].map((cat, i) => (
                <span
                  key={i}
                  className="bg-indigo-500 px-3 py-1 rounded-full shadow"
                >
                  {cat}
                </span>
              ))}
              {[
                ...(Array.isArray(artist.languages)
                  ? artist.languages
                  : [artist.languages]),
              ].map((lang, i) => (
                <span
                  key={i}
                  className="bg-purple-500 px-3 py-1 rounded-full shadow"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800">Location</h3>
            <p className="text-indigo-700 mt-1">{artist.location}</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-800">Fee Range</h3>
            <p className="text-indigo-700 mt-1">{artist.feeRange}</p>
          </div>
        </div>

        {/* Booking Request Form */}
        <div className="mt-12 bg-gray-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-indigo-700 mb-4">
            📩 Request Booking
          </h2>

          <form onSubmit={onSubmitBooking} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">
                Your Name
              </label>
              <input
                name="requester"
                type="text"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">
                Event Date
              </label>
              <input
                name="eventDate"
                type="date"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                required
                className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Tell the artist about your event..."
                rows={4}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                🚀 Request Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
