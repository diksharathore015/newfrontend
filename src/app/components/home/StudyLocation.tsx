"use client";
import { AppAssets } from "@/Constants/assets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { IoIosCall } from "react-icons/io";

const StudyLocation = ({ data }) => {
  const [show, setShow] = useState<number | null>(99999); // Use `null` to represent no card hovered
  const [showPopup, setShowPopup] = useState(false); // To toggle the popup
  const [index, setIndex] = useState<any>(null);
  const closePopup = () => {
    setShowPopup(false);
    // setShow(null);
    setIndex(null);
  };

  return (
    <>
      <div className="px-11 w-full py-16 bg-gray-50">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Discover Top Study Hubs In India
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-8 w-full">
          {data.map((hub, index) => (
            <div
              onMouseEnter={() => setShow(index)} // Set the hovered index
              onMouseLeave={() => setShow(null)} // Reset hover state when mouse leaves
              key={index}
              className="relative 2xl:py-3 hover:cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
            >
              {/* Image */}
              <div
                className="relative h-40 w-40 flex justify-center mx-auto "
                onClick={() => {
                  setIndex(index);
                  setShowPopup(true);
                }}
              >
                {hub?.Image && (
                  <Image
                    title={hub?.image_alt || hub?.title}
                    src={hub?.Image}
                    alt={hub?.image_alt || hub?.title}
                    width={150}
                    height={150}
                    className="w-full h-full rounded-md object-cover"
                  />
                )}
              </div>

              {/* Overlay on Hover */}
              {show != index && (
                <div className="absolute z-10 w-full h-full top-0 text-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-500 hover:opacity-0  transition duration-300 text-white font-bold text-3xl uppercase flex flex-col items-center justify-center">
                  {hub?.title}
                  <label
                    htmlFor="info"
                    className="text-sm mt-4 bg-white text-gray-600 p-2 rounded-md"
                  >
                    {" "}
                    Get More Details
                  </label>
                  {hub?.courses.map((item, i) => (
                    <div
                      key={i}
                      onClick={() =>
                        window.open(
                          `/${item?.slug_field}/${data[index]?.title}`
                        )
                      }
                      // href={`/${item?.slug_field}/${data[index]?.title}`}
                      className="block bg-gray-100 font-semibold hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-lg  text-xs transition-all duration-200 hover:shadow-lg mt-2 mx-1"
                    >
                      {" "}
                      {item?.short_title} in {data[index]?.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Card Content */}
              <div className="p-2">
                <h3 className="text-xl text-center uppercase font-semibold text-primary mb-2">
                  {hub?.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {hub?.short_description}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-4 mt-2">
                {/* Facebook Button */}
                {hub?.facebook_link && (
                  <a
                    href={hub?.facebook_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-110">
                      <BsFacebook className="h-6 w-6" />
                    </button>
                  </a>
                )}

                {/* Phone Button */}
                {hub?.contact_number && (
                  <a
                    href={`tel:${hub?.contact_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-gray-900 text-red-500 p-3 rounded-md hover:bg-primary transition duration-200 ease-in-out transform hover:scale-110">
                      <IoIosCall className="h-6 w-6" />
                    </button>
                  </a>
                )}

                {/* Instagram Button */}
                {hub?.instagram_link && (
                  <a
                    href={hub?.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-pink-600 text-white p-3 rounded-md hover:bg-pink-700 transition duration-200 ease-in-out transform hover:scale-110">
                      <BsInstagram className="h-6 w-6" />
                    </button>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-hidden pb-2 bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg transition-all duration-500 transform scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closePopup}
            >
              ✕
            </button>

            {/* Top heading with gradient background */}
            <h3 className="text-2xl font-bold text-white text-center mb-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg">
              Top Courses in {data[index]?.title}
            </h3>

            <ol className="space-y-4 px-3">
              {data[index]?.courses.map((item, i) => (
                <li key={i}>
                  <Link
                    target="_blank"
                    href={`/${item?.slug_field}/${data[index]?.title}`}
                    className="block bg-gray-100 font-medium hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow transition-all duration-200 hover:shadow-lg"
                  >
                    {item?.short_title} in {data[index]?.title}
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-6 text-center mx-3 flex items-center justify-center">
              <button
                onClick={closePopup}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 mb-2 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudyLocation;
