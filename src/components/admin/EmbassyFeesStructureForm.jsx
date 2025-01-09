import React, { useState } from "react";
import { TextField, Button, Typography, Divider } from "@mui/material";

const EmbassyFeesStructureForm = ({ onSubmit }) => {
  const [appointmentFees, setAppointmentFees] = useState("");
  const [fees, setFees] = useState([{ title: "", fees: "" }]);

  const handleFeesChange = (index, field, value) => {
    const updatedFees = [...fees];
    updatedFees[index][field] = value;
    setFees(updatedFees);
  };

  const addFee = () => {
    setFees([...fees, { title: "", fees: "" }]);
  };

  const removeFee = (index) => {
    setFees(fees.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      appointmentFees: Number(appointmentFees),
      fees: fees.map((fee) => ({ ...fee, fees: Number(fee.fees) })),
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen my-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-md"
      >
        <Typography variant="h5" className="mb-4 text-center">
          Embassy Fees Structure Form
        </Typography>
        <Divider className="mb-4" />
        <TextField
          label="Appointment Fees"
          variant="outlined"
          type="number"
          fullWidth
          value={appointmentFees}
          onChange={(e) => setAppointmentFees(e.target.value)}
          className="mb-4"
        />
        <Typography variant="h6" className="mb-2">
          Fees Breakdown:
        </Typography>
        {fees.map((fee, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <TextField
              label="Fee Title"
              variant="outlined"
              fullWidth
              value={fee.title}
              onChange={(e) => handleFeesChange(index, "title", e.target.value)}
            />
            <TextField
              label="Fee Amount"
              variant="outlined"
              type="number"
              fullWidth
              value={fee.fees}
              onChange={(e) => handleFeesChange(index, "fees", e.target.value)}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeFee(index)}
              className="h-fit"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button variant="outlined" onClick={addFee} className="mb-4" fullWidth>
          Add Fee
        </Button>
        <Divider className="mb-4" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmbassyFeesStructureForm;
