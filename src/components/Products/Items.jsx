"use client";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { getAllVisas } from "../../components/server/basic/basic";
import { useSelector } from "react-redux";

const Items = () => {
  const visaItems = useSelector((state) => state.visas.visas);
  // console.log(visaItems);

  return (
    <div className="my-5 grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-4">
      {visaItems.map((item, idx) => {
        // console.log(item);
        return <Item key={idx} item={item} />;
      })}
      {/* <Item /> */}
    </div>
  );
};

export default Items;
