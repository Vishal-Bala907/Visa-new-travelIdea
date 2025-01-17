import { useRouter } from "next/navigation";
import { MdUpdate } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import React from "react";

const ManageItem = ({ item }) => {
  const router = useRouter();
  return (
    <div className="relative">
      <div
        className="bg-white rounded-lg p-4 shadow-md hover:cursor-pointer m-4"
        onClick={() => router.push(`/checkout/${item.countyName}`)}
      >
        <div className="relative">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${item.bannerImage}`} // Replace with the actual image path
            alt="UAE"
            width={400}
            height={200}
            style={{
              objectFit: "cover",
            }}
            className="rounded-lg max-w-[400] max-h-[200px]"
          />
          {/* <div className="absolute top-2 right-2 bg-yellow-200 text-black px-2 py-1 rounded-xl text-xs">
           1954 issued recently
         </div> */}
        </div>

        <div className="mt-4">
          <h2 className="text-black text-lg font-bold">{item.countyName}</h2>
          <span className="text-white">{item.visaType}</span>
        </div>

        <div className="flex justify-between align-center">
          <div className="mt-2 text-black">
            <p className="text-3xl font-bold text-blue-800">₹{item.visaFee}</p>
            <p className="text-sm">+₹{item.serviceFee} (Fees+Tax)</p>
          </div>

          <div className="mt-4">
            <p className="text-black">Get Visa in</p>
            <p className="text-black font-bold">⚡️ {item.waitingTime} days</p>
          </div>
        </div>
      </div>
      <section className="absolute top-[30px] right-[3px]">
        <MdUpdate
          className="mb-4 text-[#00bb00] hover:shadow-2xl cursor-pointer"
          style={{
            fontSize: "1.5rem",
          }}
        />
        <RiDeleteBin5Fill
          className="mb-4 text-red-600 hover:shadow-2xl cursor-pointer"
          style={{
            fontSize: "1.5rem",
          }}
        />
      </section>
    </div>
  );
};

export default ManageItem;
