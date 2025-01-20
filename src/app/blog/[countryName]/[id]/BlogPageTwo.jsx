import React from "react";
import dummyBlogData from "../dummyBlogData";

function BlogPageTwo({ id }) {
  // Find the blog data based on the id
  const blogData = dummyBlogData.find((data) => data.id == id);

  // If no blog data is found, display a message
  if (!blogData) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        Blog not found!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      {/* Container for the banner and overlapping images */}
      <div className="relative">
        {/* Blog Banner Image */}
        <img
          src={blogData.bannerimg}
          alt="Blog Banner"
          className="w-full h-48 sm:h-64 object-cover rounded-lg"
        />
        {/* Additional Images */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 transform translate-y-1/2">
          <img
            src={blogData.img1}
            alt="Blog Image 1"
            className="w-1/4 h-24 sm:h-48 object-cover rounded-lg shadow-lg"
          />
          <img
            src={blogData.img2}
            alt="Blog Image 2"
            className="w-1/4 h-24 sm:h-48 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Blog Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold mt-32 sm:mt-48 mb-4 text-gray-800">
        {blogData.blogHeading}
      </h1>

      {/* Blog Description */}
      <p className="text-base sm:text-lg text-gray-600 mb-6">
        {blogData.blogDescription}
      </p>

      {/* Blog Content */}
      <div className="space-y-4 sm:space-y-6">
        {blogData.blogContent.map((content, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
              {content.contentHeading}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {content.contentDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPageTwo;
