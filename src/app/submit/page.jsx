"use client";
import React, { useState } from "react";
import StepsHeader from "../../components/formFilling/StepsHeader";
import Steps from "../../components/formFilling/Steps";
import Profile from "../../components/profile/Profile";
import { IoPersonCircle } from "react-icons/io5";

const page = () => {
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div>
      <StepsHeader />
      <div className="w-100 flex justify-center align-center my-10">
        <Steps />
      </div>
      <IoPersonCircle
        onClick={() => {
          setShowProfile(true);
        }}
      />
      {showProfile && (
        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      )}
    </div>
  );
};

export default page;
