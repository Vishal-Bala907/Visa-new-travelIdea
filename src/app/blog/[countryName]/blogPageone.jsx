import React from "react";
import blogdata from "./dummyBlogData";
const BlogPageOne = async ({ countryName }) => {
  console.log(blogdata);

  return (
    <>
      <div className="mb-[56px] flex flex-col gap-[50px] md:px-[80px] lg:px-[9.7656vh] xl:px-[13vh]">
        <div className="flex flex-col gap-[15px] px-5 lg:gap-[50px] lg:px-0">
          <h1 className="relative self-stretch font-lexend text-[24px] font-semibold leading-[160%] tracking-[-0.02em] text-royalblue-200 md:text-[28px] lg:text-[40px]">
            {countryName} Blogs
          </h1>
          <div className="flex flex-col gap-[12px] lg:gap-[20px]">
            <h2 className="text-grey-200 relative self-stretch font-lexend text-[18px] font-semibold leading-[160%] tracking-[-0.02em] md:text-[18px] lg:text-[30px]">
              Recently Published
            </h2>
            <div className="flex flex-col gap-[44px] lg:flex-row ">
              <div className="mx-auto flex min-h-[450px] w-fit cursor-pointer flex-col lg:m-0 lg:w-3/5">
                <div className="mx-auto flex h-full flex-col border border-2 border-[#F1F1F1] md:min-w-[500px] lg:m-0">
                  <figure className="mx-auto">
                    <img
                      className="h-auto items-stretch"
                      src="https://placehold.co/600x400"
                      alt="example-image"
                    />
                  </figure>
                  <div className="flex h-full flex-col gap-[12px] whitespace-normal  px-[25px] py-[15px] text-[14px]  md:text-[18px]">
                    <h4 className="text-[16px] font-bold md:text-[22px]">
                      Malaysia Digital Arrival Card (MDAC): Everything You Need
                      to Know
                    </h4>
                    <p className="inline-block flex text-[14px] text-[#667085] md:text-[20px] ">
                      Discover the Malaysia Digital Arrival Card (MDAC): what it
                      is, registration steps, form requirements, and how to
                      complete it for hassle-free entry.
                    </p>
                    <span className="text-[#0058D8]">Read more</span>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[40px] lg:w-2/5 ">
                <div className="flex cursor-pointer flex-col border border-[#F1F1F1] xxs:flex-row">
                  <img
                    src="https://placehold.co/600x400"
                    className="h-auto w-[205px]"
                    alt="blogs-example"
                  />
                  <div className="row my-[1rem] flex min-h-[173px] flex-col gap-[12px] px-[22px]">
                    <h4 className="card-para text-[14px] font-bold md:text-[16px] lg:text-[18px] xl:text-[20px]">
                      Everything You Need to Know About Malaysia Visa for
                      Indians
                    </h4>
                    <p className="card-para inline-block flex text-[12px] text-[#667085] md:text-[14px] lg:text-[16px] xl:text-[18px]">
                      Discover how to obtain a Malaysia visa for Indians with
                      our comprehensive guide. Learn about application
                      requirements, processing times, and visa fees.
                    </p>
                    <span className="inline-block flex text-[12px] text-[#0058D8] md:text-[18px]">
                      Read more
                    </span>
                  </div>
                </div>
                <div className="flex cursor-pointer flex-col border border-[#F1F1F1] xxs:flex-row">
                  <img
                    src="https://placehold.co/600x400"
                    className="h-auto w-[205px]"
                    alt="blogs-example"
                  />
                  <div className="row my-[1rem] flex min-h-[173px] flex-col gap-[12px] px-[22px]">
                    <h4 className="card-para text-[14px] font-bold md:text-[16px] lg:text-[18px] xl:text-[20px]">
                      Malaysia Visa on Arrival: Requirements and Fees for
                      Indians
                    </h4>
                    <p className="card-para inline-block flex text-[12px] text-[#667085] md:text-[14px] lg:text-[16px] xl:text-[18px]">
                      Find out the fees and eligibility for Malaysia Visa on
                      Arrival for Indians. Get the latest info to simplify your
                      travel plans!
                    </p>
                    <span className="inline-block flex text-[12px] text-[#0058D8] md:text-[18px]">
                      Read more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] px-5 sm:px-0">
          <div className="flex flex-col gap-[40px]">
            <h2 className="text-[30px] font-bold">Other Posts</h2>
            <div className="align-center flex w-full flex-row flex-wrap justify-center gap-[40px] sm:justify-start">
              <div className="m-auto flex max-h-[420px] cursor-pointer flex-col place-content-around justify-between self-stretch overflow-hidden border border-2 border-[##F1F1F1] sm:m-0 sm:w-[320px]">
                <div className="flex h-[280px] flex-col justify-between self-stretch">
                  <img
                    className=" h-[240px] w-full flex-1 object-cover"
                    loading="eager"
                    alt="country-blogs-1"
                    src="https://placehold.co/600x400"
                  />
                </div>
                <div className="bg-gray-2 flex flex-col justify-between self-stretch p-4 pb-6 sm:gap-[16px]">
                  <div className="flex flex-col justify-between gap-y-3 self-stretch">
                    <h4 className="min-h-16 m-0 inline-block self-stretch font-inter text-[18px] font-semibold">
                      Malaysia Digital Arrival Card (MDAC): Everything Y...
                    </h4>
                    <p className=" m-0 inline-block self-stretch font-inter text-[18px] font-normal leading-[23.4px] text-[#667085]">
                      Discover the Malaysia Digital Arrival Card (MDAC): what it
                      i...
                    </p>
                    <p className=" my-auto flex flex-row place-content-between font-inter text-[#0058D8]">
                      Read more
                      <img
                        src="https://placehold.co/600x400"
                        className="h-[20px] w-[20px]"
                        alt="p4"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-auto flex max-h-[420px] cursor-pointer flex-col place-content-around justify-between self-stretch overflow-hidden border border-2 border-[##F1F1F1] sm:m-0 sm:w-[320px]">
                <div className="flex h-[280px] flex-col justify-between self-stretch">
                  <img
                    className=" h-[240px] w-full flex-1 object-cover"
                    loading="eager"
                    alt="country-blogs-1"
                    src="https://placehold.co/600x400"
                  />
                </div>
                <div className="bg-gray-2 flex flex-col justify-between self-stretch p-4 pb-6 sm:gap-[16px]">
                  <div className="flex flex-col justify-between gap-y-3 self-stretch">
                    <h4 className="min-h-16 m-0 inline-block self-stretch font-inter text-[18px] font-semibold">
                      Everything You Need to Know About Malaysia Visa fo...
                    </h4>
                    <p className=" m-0 inline-block self-stretch font-inter text-[18px] font-normal leading-[23.4px] text-[#667085]">
                      Discover how to obtain a Malaysia visa for Indians with
                      our ...
                    </p>
                    <p className=" my-auto flex flex-row place-content-between font-inter text-[#0058D8]">
                      Read more
                      <img
                        src="https://placehold.co/600x400"
                        className="h-[20px] w-[20px]"
                        alt="p4"
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="m-auto flex max-h-[420px] cursor-pointer flex-col place-content-around justify-between self-stretch overflow-hidden border border-2 border-[##F1F1F1] sm:m-0 sm:w-[320px]">
                <div className="flex h-[280px] flex-col justify-between self-stretch">
                  <img
                    className=" h-[240px] w-full flex-1 object-cover"
                    loading="eager"
                    alt="country-blogs-1"
                    src="https://placehold.co/600x400"
                  />
                </div>
                <div className="bg-gray-2 flex flex-col justify-between self-stretch p-4 pb-6 sm:gap-[16px]">
                  <div className="flex flex-col justify-between gap-y-3 self-stretch">
                    <h4 className="min-h-16 m-0 inline-block self-stretch font-inter text-[18px] font-semibold">
                      Malaysia Visa on Arrival: Requirements and Fees fo...
                    </h4>
                    <p className=" m-0 inline-block self-stretch font-inter text-[18px] font-normal leading-[23.4px] text-[#667085]">
                      Find out the fees and eligibility for Malaysia Visa on
                      Arriv...
                    </p>
                    <p className=" my-auto flex flex-row place-content-between font-inter text-[#0058D8]">
                      Read more
                      <img
                        src="https://placehold.co/600x400"
                        className="h-[20px] w-[20px]"
                        alt="p4"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPageOne;
