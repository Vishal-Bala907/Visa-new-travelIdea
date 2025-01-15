import React from "react";
import Hero3 from "../../../components/hero/Hero3";
import VisaCard from "../../../components/visaCard/VisaCard";
import Testimonials from "../../../components/testimonials/Testimonials";
import FrequentlyAskedQuestions from "../../../components/faq/FrequentlyAskedQuestions";

const Page = async ({ params }) => {
  const { name } = await  params;
  const formattedName = name.replaceAll("%20", " ");

  return (
    <div>
      <Hero3 name={formattedName} />
      <VisaCard name={formattedName} />
      <Testimonials />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Page;
