import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";

import { get } from "@/actions/actions";
// import dynamic from "next/dynamic";
import CourseDescription from "./components/courses/CourseDescription";
import FAQ from "./components/home/Faqs";
import HomeInfo from "./components/home/HomeInfo";
import dynamic from "next/dynamic";
// import Banner from "./components/home/Banner";
// import Blogs from "./components/home/Blogs";
// import FeatureCourses from "./components/home/FeatureCources";
// import StudyLocation from "./components/home/StudyLocation";
// import CitiesLocation from "./components/home/TopCities";
// import TopStudents from "./components/home/TopStudents";
// import LineSlider from "./components/home/TextlineBar";

// export const dynamic = "force-dynamic"; // Ensure the page is SSR only

export const revalidate = 3600;
const Banner = dynamic(() => import("./components/home/Banner"));
const Blogs = dynamic(() => import("./components/home/Blogs"));
const FeatureCourses = dynamic(
  () => import("./components/home/FeatureCources"),
  {
    loading: () => <div>Loading...</div>,
    ssr: true,
  }
);

const StudyLocation = dynamic(() => import("./components/home/StudyLocation"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});
const CitiesLocation = dynamic(() => import("./components/home/TopCities"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});
const TopStudents = dynamic(() => import("./components/home/TopStudents"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});
const LineSlider = dynamic(() => import("./components/home/TextlineBar"), {
  loading: () => <div>Loading...</div>,
  ssr: true,
});

export async function generateMetadata({ params, searchParams }) {
  const seoData = await get(Constants.seo);
  <link rel="icon" href={seoData[0]?.image} type="image/x-icon" sizes="any" />;
  <link rel="canonical" href={seoData[0]?.canonical_url} />;
  // console.log("firstfirstfirstfirstfirst",seoData[0])
  return {
    title: ` ${seoData[0]?.title}`,
    description: seoData[0]?.description,
    keywords: seoData[0]?.keyword,
    charset: "utf-8",
    logo: {
      "@type": "ImageObject",
      url: seoData[0]?.logo, // Replace with the correct logo URL
      width: 512, // Optional, provide actual dimensions if available
      height: 512, // Optional, provide actual dimensions if available
    },

    openGraph: {
      title: seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      description: seoData[0]?.og_description.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      url: "https://www.royaldefenceacademy.com/",
      siteName: `Home- ${seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      )}`,
      type: "website", // or 'article', 'product', etc.
      images: [
        {
          url: seoData[0]?.og_image,
          width: 1200,
          height: 630,
          alt:
            seoData[0]?.og_title.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              `${params?.slug?.length > 1 ? params.slug[1] : ""}`
            ) || "Default OG Image Alt",
        },
      ],
    },

    twitter: {
      card: seoData[0]?.twitter_card,
      title: seoData[0]?.title.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        `${params?.slug?.length > 1 ? params.slug[1] : ""}`
      ),
      description: seoData[0]?.description,
      images: [seoData[0]?.og_image],
    },

    viewport: "width=device-width, initial-scale=1.0",
    robots: {
      index: true, // or false
      follow: true, // or false
    },

    alternates: {
      canonical:
        seoData[0]?.canonical_url || "https://www.royaldefenceacademy.com/", // Replace with your default canonical URL
    },
  };
}

export default async function Home() {
  const controller = new apiDataController();
  const [
    seoData,
    bannerData,
    linescrollBarData,
    studentsData,
    coursesData,
    blogsData,
    citiesData,
    stateshomepageData,
    faqsData,
    homepagecontent,
    homepagefeaturecourses,
  ] = await Promise.all([
    controller.GetApi(Constants.seo),
    controller.GetApi(Constants.bannerData),
    controller.GetApi(Constants.linescrollBarData),
    controller.GetApi(Constants.studentsData),
    controller.GetApi(Constants.courses),
    controller.GetApi(Constants.homePageBlogs),

    controller.GetApi(Constants.homePageCities),
    controller.GetApi(Constants.homePageStates),

    controller.getDataApi(Constants.faqsData),
    controller.getDataApi(Constants.homepagecontent),
    controller.getDataApi(Constants.homepagefeaturecourses),
  ]);
  // const loc = await controller.GetApi("http://ip-api.com/json/");
  // console.log("seoDataseoData", seoData);
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sainik School Coaching RIMC RMS Entrance Exam Coaching Center Military School Exam Coaching 2025-2026. Join The Royal Defence Academy for expert coaching in Sainik School, Military School, and RIMC entrance exams.",
    url: "https://www.royaldefenceacademy.com/",
    description:
      "Sainik School Coaching RIMC RMS Entrance Exam Coaching Center Military School Exam Coaching 2025-2026. Join The Royal Defence Academy for expert coaching in Sainik School, Military School, and RIMC entrance exams.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
    },
    telephone: "8769422006",
    email: "info@royaldefenceacademy.com",
    sameAs: [
      "https://www.facebook.com/royaldefence",
      "https://www.instagram.com/royaldefence",
      "https://www.youtube.com/royaldefence",
    ],
    keywords:
      "Sainik School coaching, Military School coaching, RMS coaching, RIMC coaching, Sainik School entrance exam coaching, Military School entrance exam coaching, RMS entrance exam coaching, RIMC entrance exam coaching, Best Sainik School coaching in India, Best Military School coaching in India, Best RMS coaching in India, Best RIMC coaching in India, Sainik School coaching near me, Military School coaching near me, RMS coaching near me",
  };

  const localBusiness = seoData[0] && {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    image: seoData[0]?.image,
    "@id": seoData[0]?.canonical_url,
    name: "Royal Defence Academy",
    logo: seoData[0]?.image,
    description: seoData[0]?.description,
    sameAs: [
      "https://www.youtube.com/@rdajaipur",
      "https://www.instagram.com/onlinesainikschoolcoaching/",
      "https://www.facebook.com/Sainikschoolentranceexamcoaching/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Major Bane Singh Colony Khatipura Jaipur",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302012",
      addressCountry: "India",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      ratingCount: "505",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.93392,

      longitude: 75.74775,
    },
    hasMap: "https://maps.app.goo.gl/ZtcDRKX59ZfUs62P6",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Booking & Support",
      telephone: seoData[0].contact_number,
    },
    areaServed: { "@type": "Country", name: "India" },
    priceRange: "₹500-₹20000",
    url: "https://www.royaldefenceacademy.com/",
    telephone: seoData[0].contact_number,
    email: "royaldefenceacademyjaipur@gmail.com",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "8:00",
      closes: "20:00",
    },
  };
  const structuredData = seoData[0] && {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: coursesData.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.meta_title?.replaceAll(
          /(?:\{location\}|\{Location\})/g,
          ""
        ),
        image: course.image,
        description: course.meta_description?.replaceAll(
          /(?:\{location\}|\{Location\})/g,
          ""
        ),
        courseWorkload: "4 hours per day",
        provider: {
          "@type": "Organization",
          name: "Royal defence academy",
          url: "https://www.royaldefenceacademy.com/",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.5",
          reviewCount: "33",
        },
        offers: {
          "@type": "Offer",
          category: course?.title?.replaceAll(
            /(?:\{location\}|\{Location\})/g,
            ""
          ),
          url: `https://www.royaldefenceacademy.com/${course?.slug_field}`,
          price: "Paid",
          priceCurrency: "₹",
        },
        hasCourseInstance: [
          {
            "@type": "CourseInstance",
            name: course.meta_title?.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              ""
            ),
            description: course.meta_keyword?.replaceAll(
              /(?:\{location\}|\{Location\})/g,
              ""
            ),
            instructor: {
              "@type": "Person",
              name: "Rajendra Singh Rathore", // Replace with actual instructor name
            },
            location: course.cities.map((loc) => ({
              "@type": "Place",
              name: loc.title,
              address: {
                "@type": "PostalAddress",
                addressLocality: loc.title,
                addressRegion: loc.title,
              },
            })),
            courseMode: "blended",
            courseWorkload: "PT288H",
            courseSchedule: {
              "@type": "Schedule",
              startDate: new Date("04/02/2025").toISOString().split("T"), // Today's date
              endDate: new Date(
                new Date("04/02/2025").setMonth(
                  new Date("04/02/2025").getMonth() + 1
                )
              )
                .toISOString()
                .split("T"), // 3 months from today
              courseMode: "blended", // Specify mode if necessary
              scheduleTimezone: "Asia/Kolkata", // Replace with your timezone
              repeatFrequency: "MONTHLY", // Every 3 months (ISO 8601 duration)
              repeatCount: 23, // E.g., starts 4 times per year
            },
          },
        ],
      },
    })),
  };
  const faqSchema = seoData[0] && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {seoData[0] && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: `Royal defence Academy - ${seoData[0]?.title} `,
                url: seoData[0]?.canonical_url,
                description: seoData[0]?.description,
                logo: {
                  "@type": "ImageObject",
                  url: seoData[0]?.image, // Replace with the correct logo URL
                  width: 512, // Optional, provide actual dimensions if available
                  height: 512, // Optional, provide actual dimensions if available
                },

                address: {
                  "@type": "PostalAddress",
                  streetAddress: seoData[0]?.address,
                  addressLocality: "Jaipur",
                  addressRegion: "rajasthan",
                  postalCode: "302024",
                  addressCountry: "India",
                },
                sameAs: [
                  "https://www.facebook.com/Sainikschoolentranceexamcoaching/",
                  "https://www.instagram.com/onlinesainikschoolcoaching/",
                  "https://www.youtube.com/@rdajaipur",
                ],
                keywords: seoData[0]?.keyword,
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name: "Royal defence Academy - Rashtriya Military School best coaching  ",
                url: "https://www.royaldefenceacademy.com/",
                description:
                  "High-quality education for future defense professionals.",
                logo: {
                  "@type": "ImageObject",
                  url: seoData[0]?.image, // Replace with the correct logo URL
                  width: 512, // Optional, provide actual dimensions if available
                  height: 512, // Optional, provide actual dimensions if available
                },

                address: {
                  "@type": "PostalAddress",
                  streetAddress: "major bane singh colony",
                  addressLocality: "Jaipur",
                  addressRegion: "rajasthan",
                  postalCode: "302024",
                  addressCountry: "India",
                },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
          />
        </>
      )}

      {/* {<MainForm coursesData={coursesData} />} */}

      <div className="overflow-x-hidden">
        {studentsData && <TopStudents students={studentsData} />}
        {bannerData && studentsData && (
          <Banner data={bannerData} studentsData={studentsData} />
        )}
        {seoData[0]?.length > 0 && <HomeInfo seoData={seoData[0]} />}
        {linescrollBarData && <LineSlider data={linescrollBarData} />}
        {homepagecontent.length > 0 && (
          <div className="md:w-[95%] md:mx-auto mx-1">
            <CourseDescription
              description={homepagecontent[0].details}
              currentLocation={""}
            />
          </div>
        )}
        {/* <SocialMediaIcons data={bannerData[0]} /> */}

        <div className="md:my-16">
          {homepagefeaturecourses &&
            homepagefeaturecourses.map((item: any, i: number) => (
              <FeatureCourses data={item} key={i} />
            ))}
        </div>
        {blogsData && <Blogs data={blogsData} />}

        {stateshomepageData && <StudyLocation data={stateshomepageData} />}
        {faqsData && (
          <FAQ faqsData={faqsData.filter((item: any) => item.course == null)} />
        )}
        {citiesData && <CitiesLocation initialData={citiesData} />}
        {/* <UserLocation /> */}
      </div>
    </>
  );
}
