import React from "react";
import Hero3 from "../../../components/hero/Hero3";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import VisaCard from "../../../components/visaCard/VisaCard";
import Testimonials from "../../../components/testimonials/Testimonials";
import FrequentlyAskedQuestions from "../../../components/faq/FrequentlyAskedQuestions";
import RequiredDocs from "../../../components/docs/RequiredDocs";

const Page = async ({ params }) => {
  const { name } = await params;
  const formattedName = name.replaceAll("%20", " ");

  return (
    <div>
      <Hero3 name={formattedName} />
      <VisaCard name={formattedName} />
      <ProgressBar name={formattedName} />
      <RequiredDocs name={formattedName} />
      <Testimonials />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default Page;
