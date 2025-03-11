"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MainSlider from "../UI/MainSlider";
import SliderSkeleton from "../skeleton/SliderSkeleton";
import GalleryCard from "./Gallerycard";

export default function FeatureCourses({ data }: any) {
  // console.log("testdata", data);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, [data]);

  return (
    <>
      <div className="mt-20 py-20  w-full md:px-8 px-2 overflow-x-hidden bg-blue-800 text-white">
        <div className="text-2xl md:text-4xl font-extrabold font-Montserrat italic capitalize    ">
          <Link
            target="_blank"
            href={`/${data?.slug_field}`}
            className=" font-Montserrat px-1 text-white hover:text-gray-500"
          >
            {data?.title.replaceAll(/(?:\{location\}|\{Location\})/g, "")}
          </Link>
        </div>
        <div>
          <p className=" text-gray-400 md:w-[50%]   text-sm pb-4">
            {data?.short_description.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              ""
            )}
          </p>

          <div className=" w-full  mx-auto overflow-hidden ">
            {show ? (
              <MainSlider
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: { slidesToShow: 6, slidesToScroll: 1 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 4, slidesToScroll: 1 },
                  },
                  {
                    breakpoint: 480,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                  },
                  {
                    breakpoint: 400,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                  },
                  {
                    breakpoint: 400,
                    settings: { slidesToShow: 1, slidesToScroll: 1 },
                  },
                ]}
                slides={data?.images.map((item: any, i: number) => (
                  <div className="px-2" key={i}>
                    <GalleryCard
                      key={item?.id}
                      index={i}
                      image={item?.image}
                      altText={`Gallery Image ${i + 1}`}
                      contactNumber={item?.contact_number}
                      whatsappLink={
                        "https://wa.me/+918619453001?text=Hey%20Royal%20Defence%20Academy%2C%20I%20want%20more%20information."
                      }
                      facebookLink={item?.facebook_link}
                      instagramLink={item?.instagram_link}
                      youtubeLink={item?.youtube_link}
                      blurDataURL={""}
                      title={item?.title?.replaceAll(
                        /(?:\{location\}|\{Location\})/g,
                        ""
                      )}
                      description={
                        item?.description?.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        ) ||
                        item?.meta_title?.replaceAll(
                          /(?:\{location\}|\{Location\})/g,
                          ""
                        )
                      }
                    />
                  </div>
                ))}
                slidesToScroll={3}
                slidesToShow={6}
                autoplay={true}
                infinite={true}
                autoplaySpeed={1000}

                // showDots={true}
              />
            ) : (
              <SliderSkeleton />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
