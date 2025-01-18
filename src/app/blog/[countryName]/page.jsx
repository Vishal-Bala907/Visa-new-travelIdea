import React from "react";
import blogdata from "./dummyBlogData";
import BlogPageOne from "./BlogPageOne";
const Page = async ({ params }) => {
  const { countryName } = await params;
  console.log(blogdata);

  return (
    <>
      <BlogPageOne countryName={countryName} />
    </>
  );
};

export default Page;
