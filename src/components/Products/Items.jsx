import React from "react";
import Item from "./Item";

const Items = () => {
  return (
    <div className="my-5 grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-4">
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default Items;
