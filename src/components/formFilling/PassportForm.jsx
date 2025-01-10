import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import dayjs from "dayjs";

const VITE_API_URL = "531b6d6b983dfae6cdfb128db4523040";

const initialTravelerState = {
  passportFront: null,
  passportBack: null,
  formData: {
    passportNumber: "",
    givenName: "",
    surname: "",
    sex: "",
    dateOfBirth: "", 
    placeOfBirth: "",
    issueDate: "", 
    expiryDate: "", 
    issuePlace: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pincode: "",
    mobile: "",
    email: "",
  },
  loading: false,
};

const PassportForm = () => {
  const [travelers, setTravelers] = useState([initialTravelerState]);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);

  const handleTabChange = (newValue) => setTabValue(newValue);
  const handleAddTab = () => {
    setTravelers([...travelers, initialTravelerState]);
    setTabValue(travelers.length);
  };

  const DateRangeRef = useRef(null);

  const handleDeleteTab = (index) => {
    if (index === 0) return;
    const newTravelers = travelers.filter((_, i) => i !== index);
    setTravelers(newTravelers);
    setTabValue(tabValue >= index ? tabValue - 1 : tabValue);
  };

  const fetchPassportData = async (id) => {
    try {
      return await axios.get(
        `https://api.mindee.net/v1/products/mindee/ind_passport/v1/documents/queue/${id}`,
        {
          headers: {
            Authorization: `Token ${VITE_API_URL}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const pollForResult = async (id, interval = 2000, maxAttempts = 10) => {
    let attempts = 0;
    while (attempts < maxAttempts) {
      const response = await fetchPassportData(id);
      if (response?.data?.job?.status === "completed") {
        return response;
      }
      attempts++;
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error("Job did not complete in time");
  };

  const handleImageUpload = async (e, index, type) => {
    const file = e.target.files[0];
      toast("please wait our AI is filling the form ");
    if (file) {
     
      const reader = new FileReader();
      reader.onload = () => {
        const updatedTravelers = travelers.map((traveler, i) =>
          i === index
            ? {
                ...traveler,
                [type === "front" ? "passportFront" : "passportBack"]:
                  reader.result,
              }
            : traveler
        );
        setTravelers(updatedTravelers);
      };
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("document", file);

        const response = await axios.post(
          "https://api.mindee.net/v1/products/mindee/ind_passport/v1/predict_async",
          formData,
          {
            headers: {
              Authorization: `Token ${VITE_API_URL}`,
            },
          }
        );

        const completeData = await pollForResult(response.data.job.id);
        const apiData = completeData.data.document.inference.prediction;
        setIsImageUploaded(true);

        setTravelers((prevTravelers) =>
          prevTravelers.map((traveler, i) =>
            i === index
              ? {
                  ...traveler,
                  formData: {
                    ...traveler.formData,
                    givenName:
                      apiData.given_names?.value ||
                      traveler.formData.givenName ||
                      "",
                    surname:
                      apiData.surname?.value || traveler.formData.surname || "",
                    sex:
                      apiData.gender?.value === "M"
                        ? "Male"
                        : apiData.gender?.value === "F"
                        ? "Female"
                        : "Other" || traveler.formData.sex,
                    dateOfBirth: apiData.birth_date?.value
                      ? new Date(apiData.birth_date.value)
                          .toISOString()
                          .split("T")[0]
                      : traveler.formData.dateOfBirth || "",
                    placeOfBirth:
                      apiData.birth_place?.value ||
                      traveler.formData.placeOfBirth ||
                      "",
                    issueDate: apiData.issuance_date?.value
                      ? new Date(apiData.issuance_date.value)
                          .toISOString()
                          .split("T")[0]
                      : traveler.formData.issueDate || "",
                    expiryDate: apiData.expiry_date?.value
                      ? new Date(apiData.expiry_date.value)
                          .toISOString()
                          .split("T")[0]
                      : traveler.formData.expiryDate || "",
                    issuePlace:
                      apiData.issuance_place?.value ||
                      traveler.formData.issuePlace,
                    addressLine1:
                      apiData.address1?.value ||
                      traveler.formData.addressLine1 ||
                      "",
                    addressLine2:
                      apiData.address2?.value ||
                      traveler.formData.addressLine2 ||
                      "",
                    state:
                      apiData.address3?.value?.split(",")[1]?.trim() ||
                      traveler.formData.state ||
                      "",
                    city:
                      apiData.address3?.value?.split(",")[0]?.trim() ||
                      traveler.formData.issuance_place ||
                      "",
                    pincode:
                      apiData.address3?.value?.split(",")[2]?.trim() ||
                      traveler.formData.pincode ||
                      "",
                  },
                  passportFront: traveler.passportFront,
                  passportBack: traveler.passportBack,
                }
              : traveler
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsImageUploaded(true);
      }
    }
  };

  const handleDeleteImage = (index, type) => {
    setTravelers(
      travelers.map((traveler, i) =>
        i === index
          ? {
              ...traveler,
              [type === "front" ? "passportFront" : "passportBack"]: null,
            }
          : traveler
      )
    );
  };

 const handleFormChange = (index, field, value) => {
   setTravelers((prevTravelers) =>
     prevTravelers.map((traveler, i) =>
       i === index
         ? {
             ...traveler,
             formData: {
               ...traveler.formData,
               [field]: value ?? "", // Use empty string as fallback
             },
           }
         : traveler
     )
   );
 };


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-center mb-8">
        <div className="date-range-picker-container">
          <div className="flex flex-wrap flex-col md:flex-row">
            <div>
              {windowWidth > 768 && (
                <div className="flex justify-end mt-2.5 ">
                  <div className="text-right w-1/2">
                    <label className="font-bold text-lg">
                      Tentative Departure Date
                    </label>
                  </div>

                  <div className="text-center w-1/2">
                    <label className="font-bold text-lg">
                      Tentative Return Date
                    </label>
                  </div>
                </div>
              )}

              <DateRangePicker
                ref={DateRangeRef}
                onChange={(item) => {
                  setDateRange([item.selection]);
                  setIsDateRangeSelected(true);
                }}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={windowWidth < 768 ? 1 : 2}
                ranges={dateRange}
                direction={windowWidth < 768 ? "vertical" : "horizontal"}
                minDate={tomorrow}
                showDateDisplay={false}
                rangeColors={["#3b82f6"]}
                editableDateInputs={true}
                staticRanges={[]}
                inputRanges={[]}
              />
            </div>
            <div className="flex justify-center items-center ">
              <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-sm border border-blue-100 w-4/5">
                <p className="text-lg font-semibold text-blue-800 mb-2 text-center md:text-left">
                  Selected Date:
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Tentative Departure Date
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {dateRange[0].startDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-gray-400 hidden md:block">→</span>
                  <span className="text-gray-400 md:hidden">↓</span>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Tentative Return Date
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {dateRange[0].endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="flex justify-center">
          {travelers.map((_, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`px-4 py-2 mx-1 ${
                tabValue === index ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {`Traveler ${index + 1}`}
              {index !== 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTab(index);
                  }}
                  className="ml-1 text-red-500 cursor-pointer"
                >
                  ×
                </span>
              )}
            </button>
          ))}
          <button
            onClick={handleAddTab}
            className="px-4 py-2 mx-1 bg-green-500 text-white"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-center p-6">
        <div className="w-full md:w-1/4 flex flex-col items-center space-y-4">
          {travelers[tabValue] && (
            <>
              <div className="w-full relative">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Passport Front:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, tabValue, "front")}
                  className="w-full border p-2"
                />
                <div className="relative">
                  {travelers[tabValue].passportFront ? (
                    <>
                      <img
                        src={travelers[tabValue].passportFront}
                        alt="Passport Front"
                        className="mt-4 w-3/4"
                      />
                      <button
                        onClick={() => handleDeleteImage(tabValue, "front")}
                        className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                      >
                        <FaRegTrashCan />
                      </button>
                    </>
                  ) : (
                    <img
                      src="/img/general/user_passport_front.png"
                      alt="Passport Front Placeholder"
                      className="mt-4 w-3/4"
                    />
                  )}
                </div>
              </div>
              <div className="w-full relative">
                <label className="block text-gray-700 font-bold mb-2">
                  Upload Passport Back:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, tabValue, "back")}
                  className="w-full border p-2"
                />
                {travelers[tabValue].passportBack ? (
                  <div className="relative">
                    <img
                      src={travelers[tabValue].passportBack}
                      alt="Passport Back"
                      className="mt-4 w-3/4"
                    />
                    <button
                      onClick={() => handleDeleteImage(tabValue, "back")}
                      className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                ) : (
                  <img
                    src="/img/general/user_passport_front.png"
                    alt="Passport Back Placeholder"
                    className="mt-4 w-3/4"
                  />
                )}
              </div>
            </>
          )}
        </div>

        <div className="w-full md:w-1/2 md:px-4">
          {!isImageUploaded && (
            <div className="flex absolute mt-60 max-w-screen-md md:ml-20 backdrop-blur-sm z-20">
              <div className="font-lexend text-sm font-medium bg-yellow-200 text-neutral-light-n800 p-4 rounded-lg border border-yellow-200">
                <div className="font-bold text-yellow-800">
                  <BsStars className={"inline mr-2 "} />
                  Autofill basic details
                </div>
                <p className="mt-2 text-white-800">
                  Upload passport to autofill your basic details and start your
                  application
                </p>
              </div>
            </div>
          )}

          <div
            className={`traveller-form ${!isImageUploaded ? "blur-sm" : ""}`}
          >
            <div className="m-2 bg-yellow-100 p-4 rounded-lg border border-yellow-200">
              Please note that the auto-filled information may be incorrect.
              Kindly review and make any necessary corrections.
            </div>
            {travelers[tabValue] && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Traveler&#39;s Basic Details
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    placeholder="Given Name"
                    value={travelers[tabValue].formData.givenName}
                    onChange={(e) =>
                      handleFormChange(tabValue, "givenName", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    value={travelers[tabValue].formData.surname}
                    onChange={(e) =>
                      handleFormChange(tabValue, "surname", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <select
                    value={travelers[tabValue].formData.sex}
                    onChange={(e) =>
                      handleFormChange(tabValue, "sex", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="date"
                    value={
                      travelers[tabValue].formData.dateOfBirth
                        ? dayjs(
                            travelers[tabValue].formData.dateOfBirth
                          ).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={(e) =>
                      handleFormChange(
                        tabValue,
                        "dateOfBirth",
                        e.target.value ? new Date(e.target.value) : ""
                      )
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Place of Birth"
                    value={travelers[tabValue].formData.placeOfBirth}
                    onChange={(e) =>
                      handleFormChange(tabValue, "placeOfBirth", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <div className="flex flex-wrap md:flex-nowrap gap-5">
                    <input
                      type="date"
                      value={
                        travelers[tabValue].formData.issueDate
                          ? dayjs(
                              travelers[tabValue].formData.issueDate
                            ).format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(e) =>
                        handleFormChange(
                          tabValue,
                          "issueDate",
                          e.target.value ? new Date(e.target.value) : ""
                        )
                      }
                      className="w-full p-2 border rounded"
                      required
                      disabled={!isImageUploaded}
                    />
                    <input
                      type="date"
                      value={
                        travelers[tabValue].formData.expiryDate
                          ? dayjs(
                              travelers[tabValue].formData.expiryDate
                            ).format("YYYY-MM-DD")
                          : ""
                      }
                      onChange={(e) =>
                        handleFormChange(
                          tabValue,
                          "expiryDate",
                          e.target.value ? new Date(e.target.value) : ""
                        )
                      }
                      className="w-full p-2 border rounded"
                      required
                      disabled={!isImageUploaded}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Passport Issue Place"
                    value={travelers[tabValue].formData.issuePlace}
                    onChange={(e) =>
                      handleFormChange(tabValue, "issuePlace", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Current Address Line 1"
                    value={travelers[tabValue].formData.addressLine1}
                    onChange={(e) =>
                      handleFormChange(tabValue, "addressLine1", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Current Address Line 2"
                    value={travelers[tabValue].formData.addressLine2}
                    onChange={(e) =>
                      handleFormChange(tabValue, "addressLine2", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={travelers[tabValue].formData.state}
                    onChange={(e) =>
                      handleFormChange(tabValue, "state", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={travelers[tabValue].formData.city}
                    onChange={(e) =>
                      handleFormChange(tabValue, "city", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={travelers[tabValue].formData.pincode}
                    onChange={(e) =>
                      handleFormChange(tabValue, "pincode", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    value={travelers[tabValue].formData.mobile}
                    onChange={(e) =>
                      handleFormChange(tabValue, "mobile", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={travelers[tabValue].formData.email}
                    onChange={(e) =>
                      handleFormChange(tabValue, "email", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                    disabled={!isImageUploaded}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    onClick={() => {
                      if (!isDateRangeSelected && isImageUploaded) {
                        toast("please select departure and arrival date");
                      }
                      console.log(travelers);
                    }}
                    disabled={!isImageUploaded}
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassportForm;
