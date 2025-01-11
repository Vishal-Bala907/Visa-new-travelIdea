import React from "react";
import StepsHeader from "../../../components/formFilling/StepsHeader";
import Steps from "../../../components/formFilling/Steps";
import Profile from "../../../components/profile/Profile";
import { IoPersonCircle } from "react-icons/io5";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <StepsHeader />
      <div>
        {/* {id} */}
        <Steps />
      </div>
      {/* <IoPersonCircle
        onClick={() => {
          setShowProfile(true);
        }}
      /> */}
      {/* {showProfile && (
        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
      )} */}
    </div>
  );
};

export default page;
