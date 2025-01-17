import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2"; // Import Grid2
import { Controller, useForm } from "react-hook-form";
import { CgCloseO } from "react-icons/cg";
import AutofillCountry from "../../admin/AutofillCountry";
import UpdateImage from "./UpdateImage";
import UpdateEmbassyFees from "./UpdateEmbassyFees";

const UpdateModal = ({
  visa,
  visaTypeOptions = [],
  documentOptions = [],
  tagOptions = [],
  onUpdate,
  setUpdate,
}) => {
  const [bannerImage, setBannerImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(
    visa?.bannerImageUrl || ""
  );
  const [selectedDocuments, setSelectedDocuments] = useState(
    visa?.requiredDocuments || []
  );
  const [selectedTags, setSelectedTags] = useState(visa?.tags || []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      countryName: visa?.countryName || "",
      visaType: visa?.visaType || "",
      visaFee: visa?.visaFee || "",
      serviceFee: visa?.serviceFee || "",
      waitingTime: visa?.waitingTime || "",
      stayDuration: visa?.stayDuration || "",
      visaValidity: visa?.visaValidity || "",
      insuranceDetails: visa?.insuranceDetails || "",
      description: visa?.description || "",
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
    setPreviewImageUrl(URL.createObjectURL(file));
  };

  const handleCheckboxChange = (doc) => {
    setSelectedDocuments((prev) =>
      prev.includes(doc) ? prev.filter((item) => item !== doc) : [...prev, doc]
    );
  };

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const onSubmit = (data) => {
    const updatedVisa = {
      ...data,
      bannerImage,
      requiredDocuments: selectedDocuments,
      tags: selectedTags,
    };
    onUpdate(updatedVisa);
  };

  return (
    <div
      // initial={{ opacity: 0, scale: 0.9 }}
      // animate={{ opacity: 1, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.9 }}
      // transition={{ duration: 0.3 }}
      className="absolute top-[50%] left-[50%] z-[99] w-[100%] flex justify-center self-start h-[100%] bg-[#7fffd461] backdrop-blur-[12px]"
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box
        component="form"
        className="flex flex-row flex-wrap gap-4 justify-center align-top "
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 800,
          padding: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          className="flex gap-5"
          variant="h4"
          sx={{ mb: 3, textAlign: "center" }}
        >
          <CgCloseO
            onClick={() => {
              setUpdate(false);
            }}
            className="text-red-600 cursor-pointer "
          />
          Update Visa
        </Typography>

        <Grid2 container spacing={3}>
          {/* Country Name */}
          <Grid2 xs={12}>
            <AutofillCountry
              control={control}
              name="countryName"
              errors={errors}
            />
          </Grid2>

          {/* Visa Type */}
          <Grid2 xs={12} sm={6} minWidth={"200px"}>
            <FormControl fullWidth error={!!errors.visaType}>
              <InputLabel id="visaType-label">Visa Type</InputLabel>
              <Controller
                name="visaType"
                control={control}
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
                  type="number"
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
                  type="number"
                  fullWidth
                  error={!!errors.serviceFee}
                  helperText={errors.serviceFee?.message}
                />
              )}
            />
          </Grid2>

          {/* Banner Image */}
          {/* <Grid2 xs={12}>
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
            {previewImageUrl && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={previewImageUrl}
                  alt="Banner Preview"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </Box>
            )}
          </Grid2> */}

          {/* Waiting Time */}
          <Grid2 xs={12} sm={6}>
            <Controller
              name="waitingTime"
              control={control}
              rules={{ required: "Waiting time is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Waiting Time (days)"
                  type="number"
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
              rules={{ required: "Stay duration is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stay Duration (days)"
                  type="number"
                  fullWidth
                  error={!!errors.stayDuration}
                  helperText={errors.stayDuration?.message}
                />
              )}
            />
          </Grid2>

          {/* Required Documents */}
          <Grid2 xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Required Documents
            </Typography>
            <FormGroup sx={{ maxHeight: "300px" }} className="overflow-scroll">
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

          {/* Tags Selection */}
          <Grid2 xs={12} minWidth={"200px"}>
            <FormControl fullWidth>
              <InputLabel id="tags-label">Tags</InputLabel>
              <Select
                labelId="tags-label"
                value={selectedTags}
                onChange={handleTagChange}
                multiple
                renderValue={(selected) => selected.join(", ")}
              >
                {tagOptions.map((tag, index) => (
                  <MenuItem key={index} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          {/* Submit Button */}
          <Grid2 xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Update Visa
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <UpdateImage currentImageUrl={visa.bannerImage} />
      <UpdateEmbassyFees initialData={visa.embassyFees} />
    </div>
  );
};

export default UpdateModal;
