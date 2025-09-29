import React from "react";

export default function CaliforniaLawyers() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-600">
        <span className="text-blue-600 cursor-pointer">Dashboard</span> &gt;{" "}
        <span className="text-blue-600 cursor-pointer">Find a Lawyer</span>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2">
          California Brain Injury Lawyers
        </h1>
        <p className="text-gray-600 mb-6">
          There are 596 brain injury lawyers in California. To help you make the
          best choice, Lexfactos has curated information on education, work
          experience and languages. Combine this with 5886 real reviews to
          determine the best attorney for your needs.
        </p>
      </div>

      {/* Narrow by City */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h2 className="font-semibold mb-2">Narrow Results by City</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Anaheim",
            "Bakersfield",
            "City Of Industry",
            "Fresno",
            "Hayward",
            "La Puente",
            "Long Beach",
            "Los Angeles",
            "North Hollywood",
            "Oakland",
            "Ontario",
            "Riverside",
            "Sacramento",
            "San Bernardino",
            "San Diego",
            "San Francisco",
            "San Jose",
            "Santa Ana",
            "Stockton",
            "Van Nuys",
          ].map((city) => (
            <span
              key={city}
              className="px-4 py-1 border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-100"
            >
              {city}
            </span>
          ))}
        </div>
        <button className="text-blue-600 text-sm mt-2">See more cities »</button>
      </div>

      {/* City Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-4 text-sm">
        <span className="font-medium">California lawyers by city: </span>
        <span className="text-blue-600 cursor-pointer">
          See all cities and counties
        </span>
      </div>

      {/* Count */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h2 className="font-semibold text-lg">
          California Has 596 Brain Injury Attorneys with 5886 Reviews
        </h2>
      </div>

      {/* Lawyer Card */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="bg-white border rounded-lg shadow-sm p-4 flex gap-4 items-start">
          {/* Photo */}
          <img
            src="https://via.placeholder.com/80"
            alt="Lawyer"
            className="w-20 h-20 rounded-md object-cover"
          />

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-lg">David Warner</h3>
            <p className="text-gray-600 text-sm mb-1">
              Bankruptcy & Debt Attorney
            </p>
            <p className="text-gray-500 text-sm mb-2">
              📍 Birmingham, AL · 🕑 12 years experience
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              <span className="font-semibold">4.9</span>
              <span className="text-gray-500">127 reviews</span>
            </div>

            {/* Practice Areas */}
            <div className="flex flex-wrap gap-2 mb-2">
              {["Bankruptcy Law", "Debt Relief", "Consumer Protection"].map(
                (area) => (
                  <span
                    key={area}
                    className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                  >
                    {area}
                  </span>
                )
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm">
              Experienced bankruptcy attorney helping individuals and businesses
              navigate financial difficulties.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2 min-w-[200px]">
            <button className="self-end text-sm text-gray-500">♡ Save</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Call for a consultation <br /> (202) 555-0125
            </button>
            <button className="bg-black text-white px-4 py-2 rounded w-full">
              Book appointment
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded w-full">
              View Profile
            </button>
            <p className="text-gray-500 text-xs">
              sarahjohnsonlaw.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
