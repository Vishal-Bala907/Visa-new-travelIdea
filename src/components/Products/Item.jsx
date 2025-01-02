import Image from "next/image";
import React from "react";

const Item = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="relative">
        <Image
          src="/img/destinations/uae.webp" // Replace with the actual image path
          alt="UAE"
          width={400}
          height={200}
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute top-2 right-2 bg-yellow-200 text-black px-2 py-1 rounded-xl text-xs">
          1954 issued recently
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-black text-lg font-bold">United Arab Emirates</h2>
        <span className="text-white">eVisa</span>
      </div>

      <div className="flex justify-between align-center">
        <div className="mt-2 text-black">
          <p className="text-3xl font-bold text-blue-800">₹7599</p>
          <p className="text-sm">+₹499 (Fees+Tax)</p>
        </div>

        <div className="mt-4">
          <p className="text-black">Get Visa in</p>
          <p className="text-black font-bold">⚡️ 5 days</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
