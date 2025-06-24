"use client";
import Link from "next/link";
import Navbar from "./components/Navbar";

const categories = [
  { title: "Singers", imgSrc: "/images/singer.jpg" },
  { title: "Dancers", imgSrc: "/images/dancer.jpg" },
  { title: "DJs", imgSrc: "/images/dj.png" },
  { title: "Speakers", imgSrc: "/images/speaker.png" },
];

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-100 to-purple-100 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-indigo-800">
            Welcome to Artistly 🎭
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Book the best performing artists or manage artist bookings all in
            one place.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              href="/onboard"
              className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 text-lg font-medium"
            >
              I`m an Artist Manager
            </Link>
            <Link
              href="/artists"
              className="px-6 py-3 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-100 text-lg font-medium"
            >
              I`m an Event Planner
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-10">
          🔍 Explore by Artist Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={cat.imgSrc}
                alt={cat.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-700">
                  {cat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
