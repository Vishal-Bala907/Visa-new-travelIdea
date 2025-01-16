import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import AutofillCountry from "../admin/AutofillCountry";
import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { fetchAllVisaTypes } from "../server/admin/admin";
import { type } from "os";

const Filter = ({ setFilter }) => {
  const [visaTypeOptions, setVisaOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchAllVisaTypes()
      .then((data) => {
        setVisaOptions(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const {
    control,
    watch,
    formState: { errors },
  } = useForm();

  const tagOptions = [
    "Popular",
    "Visa in a week",
    "Easy Visa",
    "Season",
    "Schengen Visa",
    "Visa Free",
  ];

  // Watch the selected country
  const selectedCountry = watch("country");
  const [selectedTags, setSelectedTags] = useState("");
  const handleTagChange = (e) => {
    const val = e.target.value;
    setSelectedTags(e.target.value);
    setFilter({ name: val, type: "string", fil: "tag" });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <header className="flex justify-center align-center py-3 bg-slate-300 gap-10 flex-row flex-wrap">
      <AutofillCountry
        sx={{ m: 0 }}
        control={control}
        name="country"
        errors={errors}
      />
      {/* <p>Selected Country: {selectedCountry?.label}</p>{" "} */}
      <div>
        {/* Tags Selection */}
        <Grid2 xs={12} className="min-w-[200px]">
          <FormControl fullWidth className="min-w-[200px]">
            <InputLabel id="tags-label">Tags</InputLabel>
            <Select
              labelId="tags-label"
              value={selectedTags}
              onChange={handleTagChange}
              className="min-w-[200px]"

              // renderValue={(selected) => selected.join(", ")}
            >
              {tagOptions.map((tag, index) => (
                <MenuItem key={index} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </div>
      <div>
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
      </div>
      <TextField id="outlined-basic" label="Price" variant="outlined" />
    </header>
    // </form>
  );
};

export default Filter;
