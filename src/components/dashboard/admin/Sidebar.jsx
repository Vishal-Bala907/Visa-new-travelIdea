"use client";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex lg:w-64 lg:justify-start lg:h-screen justify-center  lg:align-top sm:align-center h-fit  p-4  top-0 left-0  lg:flex-col flex-row sm:w-full `}
      >
        <ul className=" flex lg:flex-col flex-row lg:justify-center lg:align-center">
          <li className="lg:mb-4 hover:bg-gray-700 rounded p-2">
            <a href="#">Sales</a>
          </li>
          <li className="lg:mb-4 hover:bg-gray-700 rounded p-2">
            <a href="#">Pending</a>
          </li>
          <li className="lg:mb-4 hover:bg-gray-700 rounded p-2">
            <a href="#">New</a>
          </li>
          <li className="lg:mb-4 hover:bg-gray-700 rounded p-2">
            <a href="#">Completed</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
