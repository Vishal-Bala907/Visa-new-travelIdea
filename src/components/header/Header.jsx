import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white ">
      <div className="mx-auto px-4 py-6 pl-10 xl:px-20  lg:flex lg:justify-between sm:grid sm:grid-cols-1 sm:grid-rows-2 sm:justify-center sm:items-center">
        <img
          className="max-w-[140px]"
          src="/img/general/logoDark.png"
          alt="logo"
        />

        <div className="flex justify-center flex-row flex-wrap  items-center">
          <div className=" w-fit flex justify-center flex-row items-center gap-3 px-3 py-2 rounded-[20px] bg-blue-100 justify">
            <img
              className="max-w-[15px] max-h-[15px]"
              src="/img/general/earth.png"
              alt="earth"
            />
            <a href="#" className="text-gray-600 hover:text-blue-500">
              For Agents
            </a>
          </div>
          <div className=" w-fit flex justify-center flex-row items-center gap-3 px-3">
            <img
              className="max-w-[15px] max-h-[15px]"
              src="/img/general/whatsapp.png"
              alt="earth"
            />
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Chat with us
            </a>
          </div>
          <div className=" w-fit flex justify-center flex-row items-center gap-1 px-3">
            <FontAwesomeIcon
              style={{
                width: "15px",
                height: "15px",
              }}
              icon={faPhone}
            />
            <a href="#" className=" text-dark px-4 py-2 rounded-md">
              075 148 529 14
            </a>
          </div>

          <a
            href="#"
            className=" w-fit bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            My Applications
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
