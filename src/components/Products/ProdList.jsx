import React from "react";
import Search from "./Search";
import Items from "./Items";

const ProdList = () => {
  return (
    <div className="bg-[#E7F4F6] py-5 pl-6 pr-4 md:pl-12 md:pr-12 xl:pl-20 xl:pr-20">
      <Search />
      <Items />
    </div>
  );
};

export default ProdList;
