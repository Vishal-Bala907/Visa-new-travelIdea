"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid2,
} from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";
import { useForm, Controller } from "react-hook-form";
import AddDocument from "./AddDocument";
import AddVisaType from "./AddVisaType";
import { useSelector } from "react-redux";

const documentOptions = [
  "Passport Copy",
  "Visa Application Form",
  "Photographs",
  "Travel Itinerary",
  "Bank Statements",
  "Proof of Accommodation",
  "Employment Letter",
  "Insurance Policy",
];

// const visaTypeOptions = [
//   "Tourist Visa",
//   "Business Visa",
//   "Student Visa",
//   "Work Visa",
//   "Transit Visa",
// ];

const VisaForm = () => {
  const visaTypeOptions = useSelector((state) => state.visaType.visaType);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [bannerImage, setBannerImage] = useState(null);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      requiredDocuments: selectedDocuments,
      bannerImage,
    };
    console.log("Form Data Submitted:", formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const handleCheckboxChange = (document) => {
    setSelectedDocuments((prev) =>
      prev.includes(document)
        ? prev.filter((item) => item !== document)
        : [...prev, document]
    );
  };

  return (
    <section className="flex justify-around align-center">
      <section>
        <AddVisaType />
        <AddDocument />
      </section>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 800,
          padding: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
          Add New Visa
        </Typography>

        <Grid2 container spacing={3}>
          {/* Country Name */}
          <Grid2 xs={12}>
            <Controller
              name="countryName"
              control={control}
              defaultValue=""
              rules={{ required: "Country name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country Name"
                  fullWidth
                  error={!!errors.countryName}
                  helperText={errors.countryName?.message}
                />
              )}
            />
          </Grid2>

          {/* Visa Type */}
          <Grid2 xs={12} sx={{ maxWidth: "200px", width: "200px" }}>
            <FormControl fullWidth error={!!errors.visaType}>
              <InputLabel id="visaType-label">Visa Type</InputLabel>
              <Controller
                name="visaType"
                control={control}
                defaultValue=""
                rules={{ required: "Visa type is required" }}
                render={({ field }) => (
                  <Select {...field} labelId="visaType-label" label="Visa Type">
                    {visaTypeOptions.map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.visaType && (
                <Typography color="error">{errors.visaType.message}</Typography>
              )}
            </FormControl>
          </Grid2>

          {/* Visa Fee */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="visaFee"
              control={control}
              defaultValue=""
              rules={{
                required: "Visa fee is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Visa fee must be a number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Visa Fee"
                  fullWidth
                  error={!!errors.visaFee}
                  helperText={errors.visaFee?.message}
                />
              )}
            />
          </Grid2>

          {/* Service Fee */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="serviceFee"
              control={control}
              defaultValue=""
              rules={{
                required: "Service fee is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Service fee must be a number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Service Fee"
                  fullWidth
                  error={!!errors.serviceFee}
                  helperText={errors.serviceFee?.message}
                />
              )}
            />
          </Grid2>

          {/* Banner Image */}
          <Grid2 xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Banner Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="bannerImage"
            />
            <label htmlFor="bannerImage">
              <Button variant="contained" component="span" fullWidth>
                Choose Banner Image
              </Button>
            </label>
            {bannerImage && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={bannerImage}
                  alt="Banner Preview"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </Box>
            )}
          </Grid2>

          {/* Waiting Time */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="waitingTime"
              control={control}
              defaultValue=""
              rules={{ required: "Waiting time is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Waiting Time (in days)"
                  fullWidth
                  error={!!errors.waitingTime}
                  helperText={errors.waitingTime?.message}
                />
              )}
            />
          </Grid2>

          {/* Stay Duration */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="stayDuration"
              control={control}
              defaultValue=""
              rules={{ required: "Stay duration is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stay Duration (in days)"
                  fullWidth
                  error={!!errors.stayDuration}
                  helperText={errors.stayDuration?.message}
                />
              )}
            />
          </Grid2>

          {/* Visa Validity */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="visaValidity"
              control={control}
              defaultValue=""
              rules={{ required: "Visa validity is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Visa Validity (in days)"
                  fullWidth
                  error={!!errors.visaValidity}
                  helperText={errors.visaValidity?.message}
                />
              )}
            />
          </Grid2>

          {/* Insurance Details */}
          <Grid2 xs={12}>
            <Controller
              name="insuranceDetails"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Insurance Details"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
          </Grid2>

          {/* Description */}
          <Grid2 xs={12}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </Grid2>

          {/* Required Documents */}
          <Grid2
            xs={12}
            sx={{
              maxHeight: "300px",
              height: "200px",
              overflow: "scroll",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Required Documents
            </Typography>
            <FormGroup>
              {documentOptions.map((doc, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedDocuments.includes(doc)}
                      onChange={() => handleCheckboxChange(doc)}
                    />
                  }
                  label={doc}
                />
              ))}
            </FormGroup>
          </Grid2>

          {/* Submit Button */}
          <Grid2 xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </section>
  );
};

export default VisaForm;
