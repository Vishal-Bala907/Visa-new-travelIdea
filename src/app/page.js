"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";
import Bottom from "../components/bottom/Bottom2";
import Brands from "../components/brands/Brands";
import Hero from "../components/hero/Hero";
import Howitworks from "../components/howItsWorks/Howitworks";
import ProdList from "../components/Products/ProdList";
import Testimonials from "../components/testimonials/Testimonials";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import store from "../components/redux/configStore";

export default function Home() {
  const router = useRouter();
  // const store = configureStore();

  useEffect(() => {
    const TOKEN = JSON.parse(localStorage.getItem("token"));
    if (!TOKEN) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Provider store={store}>
      <Hero />
      <ProdList />
      <Brands />
      <Testimonials />
      <Howitworks />
      <Bottom />
    </Provider>
  );
}
