"use client";
import React, { useState } from "react";
import Filter from "../../../components/manage/Filter";
import ManageProdList from "../../../components/manage/ManageProdList";
import { useSelector } from "react-redux";

const Page = () => {
  const items = useSelector((state) => state.visas.visas);
  const [filter, setFilter] = useState(null);

  return (
    <div>
      <section>
        <Filter setFilter={setFilter} />
        <ManageProdList filter={filter} visas={items} />
      </section>
    </div>
  );
};

export default Page;
