"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // Icon for separator

import Jdata from "../../data/Jdata.json";
import LineSkeleton from "../skeleton/LineSkeleton";
import { fetchBaseUrl } from "@/Constants/urls";

export default function Breadcrumbs() {
  const path = usePathname();
  const baseURL = async () =>
    await fetchBaseUrl().then((res) => {
      console.log("qqqqqqqqqqqqqq", res);
      setMainUrl(res);
    });
  const [mainUrl, setMainUrl] = useState<any>(() => baseURL());

  useEffect(() => {
    console.log("mainUrl", mainUrl);
  }, [mainUrl]);

  // Generate breadcrumb paths dynamically
  const segments = path.split("/").splice(1);
  const breadcrumbList = [
    ...(segments.includes("course")
      ? []
      : [
          {
            "@type": "ListItem",
            position: 2,
            name: "Course",
            item: `${mainUrl}/course`,
          },
        ]),
    ...segments.map((segment, index) => ({
      "@type": "ListItem",
      position: segments.includes("course") ? index + 2 : index + 3, // Adjust position based on whether "Course" is added
      name: decodeURIComponent(segment),
      item: `${mainUrl}/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  // Add "Home" as the first item in the breadcrumb
  breadcrumbList.unshift({
    "@type": "ListItem",
    position: 1,
    name: Jdata?.home?.title,
    item: `${mainUrl}`,
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);

  return (
    <>
      {/* Inject JSON-LD for rich snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {show ? (
        <div className="w-full md:w-[100%] mx-auto  mt-4  ">
          <nav className=" inline items-center space-x-2 text-xs md:text-lg text-gray-700">
            {/* Home Link */}
            <Link
              hrefLang="en"
              href="/"
              className="text-blue-600 inline hover:text-blue-800 font-semibold transition-all ease-in-out text-sm md:text-xl capitalize"
            >
              {Jdata?.home?.title}
            </Link>
            {segments[0] != "course" && (
              <Link
                hrefLang="en"
                href="/course"
                className="text-blue-600 inline hover:text-blue-800 font-semibold transition-all ease-in-out text-sm md:text-xl capitalize"
              >
                <FaChevronRight className="text-blue-700      font-bold mt-1 text-sm md:text-xl md:-mt-1 inline" />
                courses
              </Link>
            )}

            <FaChevronRight className="text-blue-700 mt-1 md:-mt-1 inline" />

            {/* Dynamic Breadcrumbs */}
            {segments.map((item: string, i: number) => (
              <React.Fragment key={i}>
                <Link
                  hrefLang="en"
                  href={`/${segments.slice(0, i + 1).join("/")}`}
                  className="text-blue-600 hover:text-blue-800  inline font-semibold transition-all ease-in-out text-sm md:text-xl"
                >
                  {decodeURIComponent(item.replaceAll("-", " "))}
                </Link>
                {/* Display separator unless it's the last breadcrumb */}
                {i < segments.length - 1 && (
                  <FaChevronRight className="text-blue-700   mt-1 text-sm md:text-xl font-semibold  md:-mt-1 inline" />
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      ) : (
        <LineSkeleton />
      )}
    </>
  );
}
