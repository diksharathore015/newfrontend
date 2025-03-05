"use client";
import Head from "next/head";
import { BsDot } from "react-icons/bs";
import Slider from "react-slick";

export default function LineSlider({ data }: any) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet and below
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile landscape
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile portrait
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {data.map((item: any, i: any) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: item?.title, // Title of the page or article
              url: item?.link, // URL of the link
              description: `A link to ${item?.title}`, // Optional description for SEO
              mainEntityOfPage: item?.link, // Set the main URL for SEO
              publisher: {
                "@type": "Organization",
                name: "Royal Defence Academy", // Replace with your organization's name
              },
            }),
          }}
        />
      ))}

      <div className="md:py-10 md:mt-6 bg-white p-2 rounded-lg shadow-xl overflow-hidden">
        <Slider {...settings}>
          {data.map((item: any, i: any) => (
            <div
              key={i}
              className="p-4 bg-white rounded-lg   transform transition-all   hover:shadow-xl"
            >
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: item?.title, // Title of the page or article
                    url: item?.link, // URL of the link
                    description: `A link to ${item?.title}`, // Optional description for SEO
                    mainEntityOfPage: item?.link, // Set the main URL for SEO
                    publisher: {
                      "@type": "Organization",
                      name: "Royal Defence Academy", // Replace with your organization's name
                    },
                  }),
                }}
              />

              <div className="text-center">
                <a
                  href={item?.link}
                  className="text-2xl font-semibold text-gray-900 capitalize hover:text-indigo-600 transition-all duration-300 block tracking-tight leading-snug font-sans hover:underline"
                >
                  {item?.title}
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
