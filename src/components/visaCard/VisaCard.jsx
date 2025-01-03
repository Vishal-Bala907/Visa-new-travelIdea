"use client";
import React, { useState } from "react";
import Card from "./Card";

const VisaCard = () => {
  const [selectedType, setSelectedType] = useState("ALL");
  return (
    <section className="flex w-full justify-center bg-[#F5F9FF] py-8">
      <div className="relative mx-6 w-full max-w-[800px] md:w-11/12">
        <div className="my-6 flex w-full justify-center gap-x-3 px-5 py-3 text-gray-500">
          <div
            className={`min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm primary-button ${
              selectedType === "ALL"
                ? "bg-[#093258] text-white"
                : "bg-slate-400"
            }
            
            `}
            onClick={() => setSelectedType("ALL")}
          >
            All
          </div>
          <div
            className={`min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm  ${
              selectedType === "TOURIST"
                ? "bg-[#093258] text-white"
                : "bg-slate-400"
            }`}
            onClick={() => setSelectedType("TOURIST")}
          >
            Tourist
          </div>
          <div
            className={`min-w-max cursor-pointer rounded-lg px-6 py-2 text-sm  ${
              selectedType === "BUSINESS"
                ? "bg-[#093258] text-white"
                : "bg-slate-400"
            } `}
            onClick={() => setSelectedType("BUSINESS")}
          >
            Business
          </div>
        </div>
        <div className="relative flex flex-col gap-y-3 md:gap-y-6">
          <section
            className="flex h-fit flex-col rounded-2xl bg-[#F5F9FF] text-left shadow-lg
            border border-visa-card-bg gap-10"
          >
            <Card />
            <Card />
            <Card />
          </section>
        </div>
      </div>
    </section>
  );
};

export default VisaCard;
