import React from "react";
import BlogPageTwo from "./BlogPageTwo";

async function page({ params }) {
  const { id } = await params;
  return (
    <div>
      <BlogPageTwo id={id} />
    </div>
  );
}

export default page;
