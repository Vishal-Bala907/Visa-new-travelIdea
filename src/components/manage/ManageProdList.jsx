import React, { useEffect, useState } from "react";
import ManageItems from "./ManageItem";

const ManageProdList = ({ filter, visas }) => {
  const [data, setData] = useState(visas);

  useEffect(() => {
    let filteredData;
    if (filter !== null) {
      if (filter.type === "string" && filter.fil === "tag") {
        const criteria = filter.name;
        if (visas && visas.length < 1) {
          filteredData = [];
        } else {
          filteredData = visas.filter((item) => {
            return item.tag === criteria;
          });
        }

        console.log(filteredData);
        setData(filteredData);
      }
    }
  }, [filter]);
  return (
    <section className="flex justify-center align-top flex-row flex-wrap gap-15">
      {data.length < 1 ? (
        <div>No Items Found</div>
      ) : (
        data.map((item, idx) => {
          return <ManageItems key={idx} item={item} />;
        })
      )}
    </section>
  );
};

export default ManageProdList;
