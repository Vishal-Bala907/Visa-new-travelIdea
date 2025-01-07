import React from "react";
import Hero3 from "../../../components/hero/Hero3";
import VisaCard from "../../../components/visaCard/VisaCard";
import Testimonials from "../../../components/testimonials/Testimonials";
import FrequentlyAskedQuestions from "../../../components/faq/FrequentlyAskedQuestions";
import { useSelector } from "react-redux";

const page = async ({ params }) => {
  const { name } = await params;

  return (
    <div>
      <Hero3 name={name} />
      <VisaCard name={name} />
      <Testimonials />
      <FrequentlyAskedQuestions />
    </div>
  );
};

export default page;
