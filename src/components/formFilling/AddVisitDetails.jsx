import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function AddVisitDetails({ setStage }) {
  const handleSubmit = () => {
    setStage(3); 
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={6}
      bgcolor="white"
    >
      <Box
        width="100%"
        maxWidth="md"
        p={6}
        bgcolor="white"
        boxShadow={3}
        borderRadius={4}
      >
        <h2 className="text-xl font-semibold mb-4">Reason to Visit</h2>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Enter visit details here..."
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Details
        </Button>
      </Box>
    </Box>
  );
}

export default AddVisitDetails;
