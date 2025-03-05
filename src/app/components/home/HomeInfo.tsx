"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TitleBoxSkeleton from "../skeleton/TitleBoxSkeleton";

const HomeInfo = ({ seoData }: any) => {
  const [data, setData] = useState<any>(seoData);
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 md:py-10">
      <div className="  mx-auto md:px-4">
        {/* Header Section */}
        <div className="bg-white shadow-lg rounded-lg md:p-8 p-4">
          <h1 className=" text-xl md:text-4xl font-extrabold text-gray-800 md:text-center mb-6">
            {data?.title}
          </h1>
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Description Section */}
          <p className="text-gray-600 md:text-lg text-sm leading-relaxed ">
            {data?.description}
          </p>

          {/* Call-to-Action Section */}
          <div className="md:mt-8  mt-3 md:text-center">
            <button
              onClick={() => router.push("/course")}
              className="bg-gray-900 hover:bg-gray-700 text-white font-semibold md:py-3 md:px-6 px-2 py-1 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
