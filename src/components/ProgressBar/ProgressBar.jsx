"use client"
import React,{useState,useEffect} from "react";
import { CircleCheckBig } from "lucide-react";


function Page({ name }) {
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    // This code runs only on the client side
    if (window.innerWidth > 1024) {
      setBackgroundImage("url('/img/general/bg-progress-bar.png')");
    } else {
      setBackgroundImage("none");
    }
  }, []);

  return (
    <div>
      <div
        className="steps-container group my-8 flex flex-col items-center justify-center p-4 md:my-16"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "80% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="group mb-8 md:mb-16">
          <h2 className="pb-5 text-center text-2xl font-bold text-[#252D3D] md:text-[2rem]">
            Expert Visa Assistance in Just a Few Steps
          </h2>
        </div>
        <div className="group relative flex h-full w-full flex-row items-start justify-center gap-7 md:max-w-[521px] md:gap-8">
          <div className="absolute left-0 z-0 h-full w-16 overflow-hidden rounded-[60px] bg-[hsl(216,100%,98%)]">
            <div className="absolute left-[32px] z-10 h-full w-16 -translate-y-[100%] translate-x-[-50%] rounded-[60px] bg-primary transition duration-[2000ms] ease-in-out group-hover:translate-y-[0%]"></div>
            <div className="absolute w-16"></div>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-between py-4">
            <div className="flex w-full pb-[18px]">
              <div className="mr-[27px] flex min-w-[64px] items-center justify-center md:mr-[39px]">
                <div className="z-30 h-[34px] w-[34px] rounded-full bg-[#FADB5F]"></div>
              </div>
              <div className="w-full">
                <p className="text-base font-normal text-slategray-200">
                  Today
                </p>
                <p className="text-xl font-semibold text-[#252D3D]">
                  17 Jan 2025
                </p>
              </div>
            </div>
            <div>
              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px] items-start justify-center md:mr-[39px]">
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809421050x999315515097338500/billing.svg"
                    alt="Start & submit your application"
                    width="34"
                    height="34"
                    className="z-20 rounded-full bg-transparent transition group-hover:z-30 group-hover:invert duration-[500ms] invert-0 ease-linear"
                  />
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809421050x999315515097338500/billing.svg"
                    alt="Start & submit your application"
                    width="34"
                    height="34"
                    className="z-30 rounded-full bg-transparent transition group-hover:z-20 group-hover:invert duration-[2000ms] absolute invert-0 ease-linear"
                  />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Start & submit your application
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Complete your application accurately on our user-friendly
                    platform.
                  </span>
                </p>
              </div>
              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px] items-start justify-center md:mr-[39px]">
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809491489x679845802388505900/schedule.svg"
                    alt="Expert review and appointment booking"
                    width="34"
                    height="34"
                    className="z-20 rounded-full bg-transparent transition group-hover:z-30 group-hover:invert duration-[1000ms] invert-0 ease-linear"
                  />
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809491489x679845802388505900/schedule.svg"
                    alt="Expert review and appointment booking"
                    width="34"
                    height="34"
                    className="z-30 rounded-full bg-transparent transition group-hover:z-20 group-hover:invert duration-[1500ms] absolute invert-0 ease-linear"
                  />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Expert review
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Your designated visa expert reviews your application
                  </span>
                </p>
              </div>

              <div className="flex w-full py-[18px]">
                <div className="mr-[27px] flex min-w-[64px] items-start justify-center md:mr-[39px]">
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809449379x456927536791537100/email.svg"
                    alt="Visa delivered on time"
                    width="34"
                    height="34"
                    className="z-20 rounded-full bg-transparent transition group-hover:z-30 group-hover:invert duration-[2000ms] invert-0 ease-linear"
                  />
                  <img
                    src="https://55a780802dc18c444044a86ef69dab98.cdn.bubble.io/f1709809449379x456927536791537100/email.svg"
                    alt="Visa delivered on time"
                    width="34"
                    height="34"
                    className="z-30 rounded-full bg-transparent transition group-hover:z-20 group-hover:invert duration-[500ms] absolute invert-0 ease-linear"
                  />
                </div>
                <p className="flex w-full flex-col font-inter text-base">
                  <span className="inline-flex pb-2 font-inter font-bold leading-[20.99px] text-[#252D3D]">
                    Visa delivered on time
                  </span>
                  <span className="font-inter font-normal text-slategray-200">
                    Relax as we ensure your visa is processed promptly and
                    delivered on time.
                  </span>
                </p>
              </div>
            </div>
            <div className="flex w-full pt-[18px]">
              <div className="mr-[27px] flex min-w-[64px] items-center justify-center md:mr-[39px]">
                <figure className="absolute z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#D9E8FC] group-hover:z-30 group-hover:bg-[#70CDA0] delay-[2000ms]">
                  <CircleCheckBig />
                </figure>
                <figure className="absolute z-30 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#D9E8FC] delay-[0ms] group-hover:z-20"></figure>
              </div>
              <div className="w-full">
                <p className="text-base font-normal text-slategray-200">
                  Get visa by
                </p>
                <p className="text-xl font-semibold text-[#22A06B]">
                  15 Aug 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;