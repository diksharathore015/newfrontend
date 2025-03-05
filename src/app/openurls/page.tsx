export const dynamic = "force-dynamic";
import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import Fetchurls from "../components/forms/Fetchurls";

export default async function Page() {
  const controller = new apiDataController();

  // Function to open URLs with throttling

  // Function to fetch data and prepare the URLs list
  const NewsData = await controller.getDataApi(`${Constants.news}`);

  const blogsData = await controller.getDataApi(`${Constants.blogsSlug}`);
  const courseData = await controller.getDataApi(`${Constants.singlecourses}`);
  const staticUrls = [
    {
      url: `https://www.royaldefenceacademy.com`,
    },
    {
      url: `https://www.royaldefenceacademy.com/blogs`,
    },
    {
      url: `https://www.royaldefenceacademy.com/news`,
    },
  ];
  // Static routes
  const NewsSitemap = NewsData.map((item: any) => ({
    url: `https://www.royaldefenceacademy.com/news/${item?.slug_field}`,
  }));
  const blogsSitemap = blogsData.map((item: any) => ({
    url: `https://www.royaldefenceacademy.com/blogs/${item?.slug_field}`,
  }));

  const coursesSitemap = courseData.flatMap((item: any) => {
    if (!item?.slug_field) {
      console.error("Missing slug_field in course:", item);
      return [];
    }

    const stateUrls =
      item?.states?.map((state: any) => ({
        url: `https://www.royaldefenceacademy.com/${item.slug_field}/${state?.title}`,
      })) || [];

    const cityUrls =
      item?.cities?.map((city: any) => ({
        url: `https://www.royaldefenceacademy.com/${item.slug_field}/${city?.title}`,
      })) || [];

    return [...stateUrls, ...cityUrls];
  });

  const URLsList = [
    ...staticUrls,
    ...coursesSitemap,
    ...NewsSitemap,
    ...blogsSitemap,
  ];

  // console.log("Generated URLs:", URLsList);

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      <div className="flex items-center justify-center h-auto overflow-scroll">
        {URLsList && <Fetchurls urls={URLsList} />}
      </div>
    </>
  );
}
