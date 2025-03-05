"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Blogs = ({ data }: any) => {
  // console.log("mainblogs", data);
  const router = useRouter();

  return (
    <>
      <div className="p-8 py-16">
        <h2 className="text-4xl font-bold font-roboto mb-4 text-center text-gray-900">
          Popular Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((blog: any, id: any) => (
            <div
              onClick={() =>
                window.open(`/blogs/${blog?.slug_field}`, "_blank")
              }
              key={id}
              className="bg-white mb-3 hover:cursor-pointer hover:bg-gray-50 rounded-lg shadow-md p-4 w-full"
            >
              {blog?.image && (
                <Image
                  src={blog?.image}
                  alt={blog?.title}
                  title={blog?.title}
                  width={200}
                  height={200}
                  className="w-full h-60 object-fill rounded-md mb-4"
                />
              )}

              <h3 className="text-lg font-semibold mb-2 text-primary capitalize font-roboto">
                {blog?.title}
              </h3>
              <div className="text-sm text-gray-500 flex justify-between">
                <span>By {blog?.author}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/blogs")}
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-700 transition"
          >
            View All Blogs
          </button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
