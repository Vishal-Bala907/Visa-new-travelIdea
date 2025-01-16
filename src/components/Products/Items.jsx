"use client";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import { useSelector } from "react-redux";

const Items = () => {
  const visaItems = useSelector((state) => state.visas.visas);
  const count = useSelector((state) => state.visas.count);

  return (
    <div className="my-5 grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-4">
      {visaItems.map((item, idx) => {
        // console.log(item);
        if (idx < count) return <Item key={idx} item={item} />;
      })}
      {/* <Item /> */}
    </div>
  );
};

export default Items;
