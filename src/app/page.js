"use client";

import Bottom from "../components/bottom/Bottom2";
// import Bottom from "@/components/bottom/Bottom";
import Brands from "../components/brands/Brands";
import Hero from "../components/hero/Hero";
import Howitworks from "../components/howItsWorks/Howitworks";
import ProdList from "../components/Products/ProdList";
import Testimonials from "../components/testimonials/Testimonials";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();
  // router.push("/home");
  return (
    <>
      {/* <Header /> */}
      <Hero />
      <ProdList />
      <Brands />
      <Testimonials />
      <Howitworks />
      <Bottom />
      {/* <Footer /> */}
    </>
  );
}
