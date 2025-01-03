import React from "react";
import Hero3 from "@/components/hero/Hero3";
import VisaCard from "@/components/visaCard/VisaCard";

const page = async ({ params }) => {
  const { name } = await params;
  return (
    <div>
      <Hero3 name={name} />
      <VisaCard />
    </div>
  );
};

export default page;
