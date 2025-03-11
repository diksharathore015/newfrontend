"use client";
import { AppAssets } from "@/Constants/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CitiesLocation = ({ initialData }: any) => {
  const chunkSize = 20; // Number of cities to load per chunk
  const [visibleData, setVisibleData] = useState(
    initialData.slice(0, chunkSize)
  ); // Initially visible cities
  const [loadedCount, setLoadedCount] = useState(chunkSize); // Number of cities currently loaded
  const [searchQuery, setSearchQuery] = useState(""); // Search query

  // Load more cities when "Show More" button is clicked
  const loadMoreCities = () => {
    setVisibleData((prevData) => [
      ...prevData,
      ...initialData.slice(loadedCount, initialData.length),
    ]);
    setLoadedCount(initialData.length);
  };

  // Filter cities based on search query
  const filteredData = visibleData.filter((hub) =>
    hub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="md:py-4 mt-20 md:px-6   relative w-full">
        <h2 className="text-2xl md:text-4xl  pb-10 font-extrabold text-center font-Montserrat italic capitalize   text-blue-800">
          Discover Top Cities Study Hubs
        </h2>

      
        {/* Search Bar */}
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by city name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          />
        </div>

        {/* City Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-10 gap-3 font-roboto">
          {filteredData.length > 0 ? (
            filteredData.map((hub, index) => (
              <div
                key={index}
                className="relative cursor-pointer bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 ease-in-out group"
              >
                <div className="p-2 flex flex-col justify-between h-full">
                  <h3 className="text-sm font-semibold text-center text-gray-800 uppercase tracking-wide hover:text-indigo-600">
                    {hub.title}
                  </h3>
                  <ol className="space-y-1 px-3 h-0 overflow-hidden group-hover:h-full transition-opacity duration-300">
                    {hub.courses.map((item, i) => (
                      <li key={i}>
                        <div
                          onClick={() =>
                            window.open(`/${item?.slug_field}/${hub.title}`)
                          }
                          // href={`/${item?.slug_field}/${hub.title}`}
                          className="block bg-white text-sm font-medium hover:bg-gray-200 text-blue-600 px-4 py-1 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
                        >
                          {item.short_title} in {hub.title}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No cities found</p>
          )}
        </div>

        {/* Show More Button */}
        {loadedCount < initialData.length && (
          <div className="text-center mt-6">
            <button
              onClick={loadMoreCities}
              className="px-6 py-2 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CitiesLocation;
