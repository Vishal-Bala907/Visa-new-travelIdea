import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const DropDown = () => {
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const selectedValue = e.target.value; // Get the selected value
    setValue(selectedValue); // Update the state
    if (selectedValue === "add-visa") {
      router.push("/addVisa"); // Navigate to /addVisa
    }
  };

  return (
    <FormControl
      sx={{
        minWidth: "200px",
        width: "fit-content",
        marginRight: "10px",
      }}
    >
      <InputLabel id="demo-simple-select-label">Admin</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Admin"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value={"add-visa"}>Add Visa</MenuItem>
        <MenuItem value={"dsb"}>Dashboard</MenuItem>
        <MenuItem value={"thirty"}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DropDown;
