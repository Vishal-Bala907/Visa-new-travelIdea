import React from "react";
import IncomeCards from "../admin/cards/IncomeCards";
import IncomeChart from './cards/IncomeChart';

const DashData = () => {
  return (
    <section className="w-[100%]">
      <IncomeCards />
      <IncomeChart />
    </section>
  );
};

export default DashData;
