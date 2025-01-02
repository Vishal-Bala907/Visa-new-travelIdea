"use client";
import React, { useState } from "react";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import "../style.css";

const Search = () => {
  const [selected, setSelectedButton] = useState("easyVisa");
  return (
    <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row sm:gap-y-0">
      <div className="w-full sm:w-1/2">
        <div className="b-5 items-center md:mb-0 md:max-w-[384px]">
          <div
            className="relative z-20 flex h-12 items-center justify-between rounded-full border bg-white drop-shadow lg:h-14"
            id="inputDiv"
          >
            <figure className="flex w-1/6 max-w-[80px] items-center justify-center">
              <BiSolidPlaneTakeOff
                style={{
                  color: "blue",
                }}
              />
            </figure>
            <input
              className="flex-grow bg-transparent font-mono text-xs font-light text-gray-300 placeholder-gray-400 outline-none md:text-sm xl:text-base"
              type="text"
              placeholder="Where to, captain?"
            />
            <div className="flex w-1/6 justify-end pr-1">
              <figure className="relative h-9 w-9 cursor-pointer lg:h-11 lg:w-11">
                <FaSearch className="searchIcon" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="no-scrollbar flex w-full items-center justify-end gap-x-3 overflow-auto overflow-x-auto max-lg:justify-start">
        <button
          onClick={() => {
            setSelectedButton("popular");
            console.log(selected);
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868] ${
           selected === "popular" ? "border-[#0058D8]" : ""
         }
      `}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setSelectedButton("visaInWeek");
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868]
        ${selected === "visaInWeek" ? "border-[#0058D8]" : ""}
      `}
        >
          Visa in a week
        </button>
        <button
          onClick={() => {
            setSelectedButton("easyVisa");
            console.log(selected);
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight bg-white
   
        ${selected === "easyVisa" ? "border-[#0058D8]" : ""}
      `}
        >
          Easy Visa
        </button>
        <button
          onClick={() => {
            setSelectedButton("season");
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
         bg-white text-[#686868]
        ${selected === "season" ? "border-[#0058D8]" : ""}
      `}
        >
          Season
        </button>
        <button
          onClick={() => {
            setSelectedButton("schengenVisa");
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
        bg-white text-[#686868]
        ${selected === "schengenVisa" ? "border-[#0058D8]" : ""}
      `}
        >
          Schengen Visa
        </button>
        <button
          onClick={() => {
            setSelectedButton("visaFree");
          }}
          className={`
        min-w-fit rounded-full border px-4 py-2 font-inter text-xs font-medium leading-tight
        bg-white  text-[#686868]
        ${selected === "visaFree" ? "border-[#0058D8]" : ""}
      `}
        >
          Visa Free
        </button>
      </div>
    </div>
  );
};

export default Search;
