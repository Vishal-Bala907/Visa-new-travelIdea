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
import { Provider, useDispatch } from "react-redux";
import store from "../components/redux/configStore";
import { addAllVisas } from "../components/redux/slices/Visas";
import { getAllVisas } from "../components/server/basic/basic";

export default function Home() {
  const router = useRouter();
  // const store = configureStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const TOKEN = JSON.parse(localStorage.getItem("token"));
    if (!TOKEN) {
      router.push("/login");
    }
    getAllVisas()
      .then((data) => {
        dispatch(addAllVisas(data));
      })
      .catch((err) => {
        console.log(err);
      });
    // fethc all the visas
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
