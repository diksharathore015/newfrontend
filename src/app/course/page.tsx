import { Constants } from "@/Constants/urls";
import apiDataController from "@/controllers/RequestController";
import FeatureCourses from "../components/home/FeatureCources";
import Settitle from "../components/comman/Settitle";
import Breadbrumbs from "../components/UI/Breadbrumbs";

// export const dynamic = "force-dynamic"; // Ensures dynamic rendering

// Dynamic metadata generation
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<any> {
  try {
    // Extract dynamic ID from params
    const id = params.id;

    // Fetch  data
    const data = await fetch(`${Constants.coursesSeoData}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch  metadata");
      return res.json();
    });

    // Return metadata
    // console.log("testseocoursedata", data);
    <link rel="canonical" href={`https://www.royaldefenceacademy.com/course`} />;
    return {
      title: data[0].meta_title,
      description: data[0].meta_description,
      keywords: data[0].meta_keywords, // Custom field (not officially supported but still useful for manual meta tags)
      openGraph: {
        title: data[0].og_title,
        description: data[0].og_description,
        images: [data[0].og_image],
      },
      twitter: {
        card: data[0].twitter_card,
        title: data[0].og_title,
        description: data[0].og_description,
        images: [data[0].og_image],
      },
      alternates: {
        canonical: `https://www.royaldefenceacademy.com/course`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

// Page Component
export default async function Page() {
  const controller = new apiDataController();
  // Fetch courses
  const data = await controller.getDataApi(Constants.courses);
  const seodata = await fetch(`${Constants.coursesSeoData}`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch  metadata");
    return res.json();
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        url: `https://www.royaldefenceacademy.com/course/${course.slug_field}`,
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
          url: "https://www.royaldefenceacademy.com",
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
              repeatCount: 12, // E.g., starts 4 times per year
            },
            audience: [
              {
                "@type": "Audience",
                audienceType:
                  "Students appearing for Sainik School Entrance Exam ",
              },
            ],
            publisher: {
              "@type": "Organization",
              name: "Royal Defence Academy",
              sameAs: "https://www.royaldefenceacademy.com",
            },
          },
        ],
      },
    })),
  };
  // console.log("datadatadata", data);
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.map((course, index) => ({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      image: course.image,
      "@id": "https://www.royaldefenceacademy.com/course",
      name: "Royal Defence Academy",
      logo: course?.image,
      description: course?.short_description?.replaceAll(
        /(?:\{location\}|\{Location\})/g,
        ""
      ),
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
        telephone: course.contact_number,
      },
      areaServed: { "@type": "Country", name: "India" },
      priceRange: "₹500-₹20000",
      url: "https://www.royaldefenceacademy.com/course",
      telephone: course.contact_number,
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
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      <Breadbrumbs />

      <Settitle data={seodata[0]?.meta_title} />
      {data &&
        data.map((item: any, i: number) => (
          <FeatureCourses data={item} key={i} test={item} />
        ))}
    </>
  );
}
