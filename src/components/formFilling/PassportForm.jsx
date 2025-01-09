import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaRegTrashCan } from "react-icons/fa6";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { BsStars } from "react-icons/bs";
import "./PassportForm.css";
import { toast, ToastContainer } from "react-toastify";
const VITE_API_URL = "531b6d6b983dfae6cdfb128db4523040";

const initialTravelerState = {
  passportFront: null,
  passportBack: null,
  formData: {
    passportNumber: "",
    givenName: "",
    surname: "",
    sex: "",
    dateOfBirth: null,
    placeOfBirth: "",
    issueDate: null,
    expiryDate: null,
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
  // document.querySelector('[data-nextjs-toast="true"]').remove();
  const [travelers, setTravelers] = useState([initialTravelerState]);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [formid, setFormid] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleTabChange = (_, newValue) => setTabValue(newValue);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isDateRangeSelected, setIsDateRangeSelected] = useState(false);
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
    if (file) {
      toast("please wait our AI is filling the form ");
      const reader = new FileReader();
      reader.onload = () => {
        // Update the image in the state
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
        console.log(
          "Image uploaded and state updated:",
          updatedTravelers[index]
        );
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
        console.log("Job ID:", response.data.job.id);

        const completeData = await pollForResult(response.data.job.id);
        console.log("Complete Data:", completeData.data);

        // Extract relevant data from the API response
        const apiData = completeData.data.document.inference.prediction;
        setIsImageUploaded(true);
        // Update the form fields with the extracted data, preserving existing data if not null
        setTravelers((prevTravelers) =>
          prevTravelers.map((traveler, i) =>
            i === index
              ? {
                  ...traveler,
                  formData: {
                    ...traveler.formData,
                    givenName:
                      apiData.given_names?.value || traveler.formData.givenName,
                    surname:
                      apiData.surname?.value || traveler.formData.surname,
                    sex:
                      apiData.gender?.value === "M"
                        ? "Male"
                        : "F"
                        ? "Female"
                        : "Other" || traveler.formData.sex,
                    dateOfBirth: apiData.birth_date?.value
                      ? new Date(apiData.birth_date.value)
                      : traveler.formData.dateOfBirth,
                    placeOfBirth:
                      apiData.birth_place?.value ||
                      traveler.formData.placeOfBirth,
                    issueDate: apiData.issuance_date?.value
                      ? new Date(apiData.issuance_date.value)
                      : traveler.formData.issueDate,
                    expiryDate: apiData.expiry_date?.value
                      ? new Date(apiData.expiry_date.value)
                      : traveler.formData.expiryDate,
                    issuePlace:
                      apiData.issuance_place?.value ||
                      traveler.formData.issuePlace,
                    addressLine1:
                      apiData.address1?.value || traveler.formData.addressLine1,
                    addressLine2:
                      apiData.address2?.value || traveler.formData.addressLine2,
                    state:
                      apiData.address3?.value?.split(",")[1]?.trim() ||
                      traveler.formData.state,
                    city:
                      apiData.address3?.value?.split(",")[0]?.trim() ||
                      traveler.formData.issuance_place,
                    pincode:
                      apiData.address3?.value?.split(",")[2]?.trim() ||
                      traveler.formData.pincode,
                  }, // Explicitly preserve the image data
                  passportFront: traveler.passportFront,
                  passportBack: traveler.passportBack,
                }
              : traveler
          )
        );

        console.log("Form data updated with API response:", travelers[index]);
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
    setTravelers(
      travelers.map((traveler, i) =>
        i === index
          ? {
              ...traveler,
              formData: { ...traveler.formData, [field]: value },
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
      <Box className="flex justify-center mb-8">
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
      </Box>

      <Box className="w-full bg-white">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          selectionFollowsFocus
        >
          {travelers.map((_, index) => (
            <Tab
              key={index}
              label={
                <Box className="flex items-center">
                  {`Traveler ${index + 1}`}
                  {index !== 0 && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTab(index)}
                      className="ml-1"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              }
            />
          ))}
          <IconButton onClick={handleAddTab} className="ml-1">
            <AddIcon />
          </IconButton>
        </Tabs>
      </Box>

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

        {/* Warning message above the blurred content */}
        <div className="w-full md:w-1/2 md:px-4">
          {!isImageUploaded && (
            <div className="flex absolute mt-60 max-w-screen-md md:ml-20 backdrop-blur-sm">
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

          {/* Blurred traveller-form */}
          <div
            className={`traveller-form ${!isImageUploaded ? "blur-sm" : ""}`}
          >
            <Alert className="m-2" severity="warning">
              Please note that the auto-filled information may be incorrect.
              Kindly review and make any necessary corrections.
            </Alert>
            {travelers[tabValue] && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Traveler&#39;s Basic Details
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <TextField
                    label="Given Name"
                    value={travelers[tabValue].formData.givenName}
                    onChange={(e) =>
                      handleFormChange(tabValue, "givenName", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Surname"
                    value={travelers[tabValue].formData.surname}
                    onChange={(e) =>
                      handleFormChange(tabValue, "surname", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <FormControl fullWidth required>
                    <InputLabel>Sex</InputLabel>
                    <Select
                      value={travelers[tabValue].formData.sex}
                      onChange={(e) =>
                        handleFormChange(tabValue, "sex", e.target.value)
                      }
                      label="Sex"
                      disabled={!isImageUploaded} // Disable if no image is uploaded
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={
                        travelers[tabValue].formData.dateOfBirth
                          ? dayjs(travelers[tabValue].formData.dateOfBirth)
                          : null
                      }
                      onChange={(newValue) =>
                        handleFormChange(
                          tabValue,
                          "dateOfBirth",
                          newValue ? newValue.toDate() : null
                        )
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                          disabled: !isImageUploaded,
                        },
                      }}
                    />
                  </LocalizationProvider>
                  <TextField
                    label="Place of Birth"
                    value={travelers[tabValue].formData.placeOfBirth}
                    onChange={(e) =>
                      handleFormChange(tabValue, "placeOfBirth", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <div className="flex flex-wrap md:flex-nowrap gap-5">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Passport Issue Date"
                        value={
                          travelers[tabValue].formData.issueDate
                            ? dayjs(travelers[tabValue].formData.issueDate)
                            : null
                        }
                        onChange={(newValue) =>
                          handleFormChange(
                            tabValue,
                            "issueDate",
                            newValue ? newValue.toDate() : null
                          )
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            disabled: !isImageUploaded,
                          },
                        }} // Disable if no image is uploaded
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Passport Expiry Date"
                        value={
                          travelers[tabValue].formData.expiryDate
                            ? dayjs(travelers[tabValue].formData.expiryDate)
                            : null
                        }
                        onChange={(newValue) =>
                          handleFormChange(
                            tabValue,
                            "expiryDate",
                            newValue ? newValue.toDate() : null
                          )
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                            disabled: !isImageUploaded,
                          },
                        }} // Disable if no image is uploaded
                      />
                    </LocalizationProvider>
                  </div>
                  <TextField
                    label="Passport Issue Place"
                    value={travelers[tabValue].formData.issuePlace}
                    onChange={(e) =>
                      handleFormChange(tabValue, "issuePlace", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Current Address Line 1"
                    value={travelers[tabValue].formData.addressLine1}
                    onChange={(e) =>
                      handleFormChange(tabValue, "addressLine1", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Current Address Line 2"
                    value={travelers[tabValue].formData.addressLine2}
                    onChange={(e) =>
                      handleFormChange(tabValue, "addressLine2", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="State"
                    value={travelers[tabValue].formData.state}
                    onChange={(e) =>
                      handleFormChange(tabValue, "state", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />

                  <TextField
                    label="City"
                    value={travelers[tabValue].formData.city}
                    onChange={(e) =>
                      handleFormChange(tabValue, "city", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Pincode"
                    value={travelers[tabValue].formData.pincode}
                    onChange={(e) =>
                      handleFormChange(tabValue, "pincode", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Mobile Number"
                    value={travelers[tabValue].formData.mobile}
                    onChange={(e) =>
                      handleFormChange(tabValue, "mobile", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <TextField
                    label="Email Address"
                    value={travelers[tabValue].formData.email}
                    onChange={(e) =>
                      handleFormChange(tabValue, "email", e.target.value)
                    }
                    fullWidth
                    required
                    disabled={!isImageUploaded} // Disable if no image is uploaded
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                    onClick={() => {
                      {
                        console.log("button clicked");
                        console.log(
                          "form data",
                          travelers
                        )(!isDateRangeSelected && isImageUploaded)
                          ? toast("please select departure and arrival date")
                          : "";
                      }
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
