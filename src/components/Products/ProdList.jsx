"use client";
import React from "react";
import Search from "./Search";
import Items from "./Items";
import { useDispatch } from "react-redux";
import { showMore } from "../redux/slices/Visas";

const ProdList = () => {
  const dispatch = useDispatch();
  const handleShowMore = () => {
    dispatch(showMore());
  };
  return (
    <div className="bg-[#d2b4f863] py-5 pl-6 pr-4 md:pl-12 md:pr-12 xl:pl-20 xl:pr-20">
      <Search />
      <Items />
      <button
        onClick={handleShowMore}
        className="bg-white text-center p-3 rounded-2xl shadow-md hover:font-bold"
      >
        Load more
      </button>
    </div>
  );
};

export default ProdList;
