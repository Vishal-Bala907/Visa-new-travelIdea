import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  IconButton,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./PassportForm.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Use AdapterDayjs
import { FaRegTrashCan } from "react-icons/fa6";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs"; // Import dayjs
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme css file

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const PassportForm = () => {
  const [travelers, setTravelers] = useState([
    {
      passportFront: null,
      passportBack: null,
      formData: {
        passportNumber: "",
        givenName: "",
        surname: "",
        sex: "",
        dateOfBirth: null, // Use null for dayjs compatibility
        placeOfBirth: "",
        issueDate: null, // Use null for dayjs compatibility
        expiryDate: null, // Use null for dayjs compatibility
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
      error: "",
    },
  ]);

  const [tabValue, setTabValue] = React.useState(0);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAddTab = () => {
    const newTraveler = {
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
      error: "",
    };
    setTravelers([...travelers, newTraveler]);
    setTabValue(travelers.length); // Select the new tab
  };

  const handleDeleteTab = (index) => {
    if (index === 0) return; // Prevent deletion of the first traveler
    const newTravelers = travelers.filter((_, i) => i !== index);
    if (tabValue === index) {
      setTabValue(0);
    } else if (tabValue > index) {
      setTabValue(tabValue - 1);
    }
    setTravelers(newTravelers);
  };

  const handleImageUpload = async (e, index, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "front") {
          setTravelers(
            travelers.map((traveler, i) =>
              i === index
                ? { ...traveler, passportFront: reader.result }
                : traveler
            )
          );
        } else {
          setTravelers(
            travelers.map((traveler, i) =>
              i === index
                ? { ...traveler, passportBack: reader.result }
                : traveler
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <div className="date-range-picker-container">
          <DateRangePicker
            onChange={(item) => setDateRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1} // Show only one month by default
            ranges={dateRange}
            direction="horizontal"
            minDate={tomorrow} // Disable today and previous dates
          />
        </div>
      </Box>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={tabValue} onChange={handleChange} centered>
          {travelers.map((_, index) => (
            <Tab
              key={index}
              label={
                <Box display="flex" alignItems="center">
                  {`Traveller ${index + 1}`}
                  {index !== 0 && (
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTab(index)}
                      sx={{ marginLeft: 1 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              }
            />
          ))}
          <IconButton onClick={handleAddTab} sx={{ marginLeft: 1 }}>
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
                {travelers[tabValue].passportFront && (
                  <div className="relative">
                    <img
                      src={travelers[tabValue].passportFront}
                      alt="Passport Front"
                      className="mt-4 w-3/4"
                    />
                    <button
                      onClick={() =>
                        setTravelers(
                          travelers.map((traveler, i) =>
                            i === tabValue
                              ? { ...traveler, passportFront: null }
                              : traveler
                          )
                        )
                      }
                      className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                )}
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
                {travelers[tabValue].passportBack && (
                  <div className="relative">
                    <img
                      src={travelers[tabValue].passportBack}
                      alt="Passport Back"
                      className="mt-4 w-3/4"
                    />
                    <button
                      onClick={() =>
                        setTravelers(
                          travelers.map((traveler, i) =>
                            i === tabValue
                              ? { ...traveler, passportBack: null }
                              : traveler
                          )
                        )
                      }
                      className="absolute top-0 left-0 text-red-600 text-3xl p-1 bg-white rounded-full border-2 border-white hover:bg-gray-200"
                    >
                      <FaRegTrashCan />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-1/2 md:w-1/2 px-4">
          {travelers[tabValue] && (
            <>
              <h2 className="text-xl font-bold mb-4">
                Traveler's Basic Details
              </h2>
              {travelers[tabValue].loading && (
                <p className="text-blue-500">Extracting text, please wait...</p>
              )}
              {travelers[tabValue].error && (
                <p className="text-red-500">{travelers[tabValue].error}</p>
              )}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <TextField
                  label="Given Name"
                  value={travelers[tabValue].formData.givenName}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                givenName: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Surname"
                  value={travelers[tabValue].formData.surname}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                surname: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <FormControl fullWidth required>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    value={travelers[tabValue].formData.sex}
                    onChange={(e) =>
                      setTravelers(
                        travelers.map((traveler, i) =>
                          i === tabValue
                            ? {
                                ...traveler,
                                formData: {
                                  ...traveler.formData,
                                  sex: e.target.value,
                                },
                              }
                            : traveler
                        )
                      )
                    }
                    label="Sex"
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
                      setTravelers(
                        travelers.map((traveler, i) =>
                          i === tabValue
                            ? {
                                ...traveler,
                                formData: {
                                  ...traveler.formData,
                                  dateOfBirth: newValue
                                    ? newValue.toDate()
                                    : null,
                                },
                              }
                            : traveler
                        )
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  label="Place of Birth"
                  value={travelers[tabValue].formData.placeOfBirth}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                placeOfBirth: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Passport Issue Date"
                    value={
                      travelers[tabValue].formData.issueDate
                        ? dayjs(travelers[tabValue].formData.issueDate)
                        : null
                    }
                    onChange={(newValue) =>
                      setTravelers(
                        travelers.map((traveler, i) =>
                          i === tabValue
                            ? {
                                ...traveler,
                                formData: {
                                  ...traveler.formData,
                                  issueDate: newValue
                                    ? newValue.toDate()
                                    : null,
                                },
                              }
                            : traveler
                        )
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
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
                      setTravelers(
                        travelers.map((traveler, i) =>
                          i === tabValue
                            ? {
                                ...traveler,
                                formData: {
                                  ...traveler.formData,
                                  expiryDate: newValue
                                    ? newValue.toDate()
                                    : null,
                                },
                              }
                            : traveler
                        )
                      )
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  label="Passport Issue Place"
                  value={travelers[tabValue].formData.issuePlace}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                issuePlace: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Current Address Line 1"
                  value={travelers[tabValue].formData.addressLine1}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                addressLine1: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Current Address Line 2"
                  value={travelers[tabValue].formData.addressLine2}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                addressLine2: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <FormControl fullWidth required>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={travelers[tabValue].formData.state}
                    onChange={(e) =>
                      setTravelers(
                        travelers.map((traveler, i) =>
                          i === tabValue
                            ? {
                                ...traveler,
                                formData: {
                                  ...traveler.formData,
                                  state: e.target.value,
                                },
                              }
                            : traveler
                        )
                      )
                    }
                    label="State"
                  >
                    {indianStates.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="City"
                  value={travelers[tabValue].formData.city}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                city: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Pincode"
                  value={travelers[tabValue].formData.pincode}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                pincode: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Mobile Number"
                  value={travelers[tabValue].formData.mobile}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                mobile: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <TextField
                  label="Email Address"
                  value={travelers[tabValue].formData.email}
                  onChange={(e) =>
                    setTravelers(
                      travelers.map((traveler, i) =>
                        i === tabValue
                          ? {
                              ...traveler,
                              formData: {
                                ...traveler.formData,
                                email: e.target.value,
                              },
                            }
                          : traveler
                      )
                    )
                  }
                  fullWidth
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassportForm;
