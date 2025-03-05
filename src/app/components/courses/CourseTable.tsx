import React from "react";
import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

interface CourseTableProps {
  course: {
    meta_title: string;
    short_description: string;
    rating?: string | number;
    contact_number?: string;
    address?: string;
  };
  currentLocation?: string;
  locationdatas?: any;
  newDate: string;
  startDate: string;
}

const CourseTable: React.FC<CourseTableProps> = ({
  course,
  currentLocation,
  locationdatas,
  newDate,
  startDate,
}) => {
  const names = [
    "Royal Defence Online Academy",
    "Royal Sainik & Military School Coaching",
    "RIMC & RMS Online Coaching - Royal Defence",
    "Royal Defence Live Classes for Sainik & Military Schools",
    "Best Online Coaching for RMS, RIMC & Sainik Schools",
    "Royal Defence Academy – RIMC, RMS, Sainik School Prep",
    "Sainik & Military School Online Classes – Royal Defence",
    "RIMC, RMS & Sainik School Online Coaching Hub",
    "Royal Defence Live – Sainik, RMS, RIMC Coaching",
    "Sainik, Military, and RIMC Entrance Coaching Online",
    "Royal Defence Live Coaching",
    "RMS, RIMC, Sainik School Online Academy",
    "Royal Defence Academy Online",
    "Sainik & Military Entrance Online Classes",
    "RIMC & RMS Online Training by Royal Defence",
  ];

  const locationId = locationdatas?.matchedItem?.id || 0;
  const selectedCourseName = names[locationId % names.length];
  
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${
    locationdatas?.matchedItem?.latitude || "26.933927084173696"
  },${locationdatas?.matchedItem?.logitude || "75.74766294048028"}`;

  return (
    <table className="table-auto w-full border-collapse rounded-lg shadow-lg overflow-hidden">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="border p-3 text-left font-semibold text-sm sm:text-base">
            Attribute
          </th>
          <th className="border p-3 text-left font-semibold text-sm sm:text-base">
            Details
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Course Title</td>
          <td className="border p-3 text-sm sm:text-base">
            {course?.meta_title.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${currentLocation || ""}`
            )}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Description</td>
          <td className="border p-3 text-sm sm:text-base">
            {course?.short_description.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${currentLocation || ""}`
            )}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Instructor</td>
          <td className="border p-3 text-sm sm:text-base">
            Rajendra Singh Rathore
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Course Mode</td>
          <td className="border p-3 text-sm sm:text-base">Blended</td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Duration</td>
          <td className="border p-3 text-sm sm:text-base">24 hours per week</td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Start Date</td>
          <td className="border p-3 text-sm sm:text-base">{startDate}</td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">End Date</td>
          <td className="border p-3 text-sm sm:text-base">{newDate}</td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Opening Hours</td>
          <td className="border p-3 text-sm sm:text-base">
            Monday to Saturday: 8:00 AM - 8:00 PM
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Rating</td>
          <td className="border p-3 text-sm sm:text-base flex items-center">
            {course?.rating || "4.5"}
            {[1, 2, 3, 4].map((_, i) => (
              <BiSolidStar key={i} className="text-yellow-400" />
            ))}{" "}
            <BiSolidStarHalf className="text-yellow-400" />
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Contact Number</td>
          <td className="border p-3 text-sm sm:text-base">
            {course?.contact_number || "N/A"}
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Location on Map</td>
          <td className="border p-3 text-sm sm:text-base">
            <a
              href={googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View on Google Maps
            </a>
          </td>
        </tr>
        <tr className="bg-white hover:bg-gray-50">
          <td className="border p-3 text-sm sm:text-base">Address</td>
          <td className="border p-3 text-sm sm:text-base capitalize">
            {selectedCourseName}{" "}
            {locationdatas?.matchedItem?.title
              ? `, ${locationdatas?.matchedItem?.title.replaceAll("-", " ")}`
              : "India"}{" "}
            {locationdatas?.cityName || ""},{" "}
            {`${
              locationdatas?.stateName ? `${locationdatas?.stateName}` : ""
            }` || ""}{" "}
            {locationdatas?.matchedItem?.pincode || ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default CourseTable;
