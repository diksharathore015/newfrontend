import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
// import { store } from "@/store";
// import { setHomepageTitle } from "@/store/homepageSlice";
import BlogCard from "../components/blogs/BlogCard";
import { AppAssets } from "@/Constants/assets";
import { Metadata } from "next";
import Image from "next/image";
// import Redirectblog from "../components/blogs/Redirectblog";
export const revalidate = 3600;
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function page() {
  const controller = new apiDataController();
  const blogsData = await controller.getDataApi(`${Constants.allblogs}`);

  return (
    <>
      {/* <Redirectblog data={blogsData} /> */}
      <div className=" w-[95%] mx-auto my-5">
        <h1 className="md:text-4xl text-base md:font-extrabold flex items-center  bg-gray-200 rounded-md">
          <span className="inline-block">
            {" "}
            <Image
              src={AppAssets.logo}
              alt="Royal Defence Academy"
              width={400}
              height={400}
              className="md:w-24 md:h-24 w-20 h-20 "
            />
          </span>{" "}
          Insights & Inspiration: Browse Our Blog Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 ">
          {blogsData &&
            blogsData?.map((blog: any, i: number) => (
              <BlogCard blog={blog} key={i} />
            ))}
        </div>
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title:
    "Defence career tips, defence academy insights, latest blogs on defence Blogs - Royal Defence Academy",
  description:
    "Explore the latest blogs from the Royal Defence Academy. Stay updated with valuable insights, tips, and expert guidance for your defence career.",
  keywords:
    "Royal Defence Academy blogs, defence career tips, defence academy insights, latest blogs on defence",
  openGraph: {
    title: "Royal Defence Academy Blogs",
    url: "https://www.royaldefenceacademy.com/blogs/",
    siteName: "Royal Defence Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Royal Defence Academy Blogs",
    description:
      "Explore the latest blogs from the Royal Defence Academy. Stay updated with valuable insights, tips, and expert guidance for your defence career.",
    // Replace with your default image URL
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.royaldefenceacademy.com/blogs/",
  },
};
