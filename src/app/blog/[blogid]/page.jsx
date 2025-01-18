import React from "react";

const Page = async ({ params }) => {
  const { blogid } = await params;
  return <div>{blogid}</div>;
};

export default Page;
