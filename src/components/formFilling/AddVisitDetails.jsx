import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextareaAutosize } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addVisaRequest } from "../redux/slices/VisaRequest";

function AddVisitDetails({ setStage }) {
  const [visitDetails, setVisitDetails] = useState(""); // State for the textarea input
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  // console.log("visaRequests ", visaRequests);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    await setStage(3);
    // Dispatch the action to update purposeOfVisit in Redux
    dispatch(addVisaRequest({ ...visaRequests, purposeOfVisit: visitDetails }));
    // const visaRequests2 = useSelector((state) => state.visaRequest.visaRequests);
    // console.log("visaRequests2 ", visaRequests2);
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
        <TextareaAutosize
          minRows={4}
          placeholder="Enter visit details here..."
          value={visitDetails}
          onChange={(e) => setVisitDetails(e.target.value)} // Update state on input change
          style={{
            width: "100%",
            fontSize: "16px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit Details
        </Button>
      </Box>
    </Box>
  );
}

export default AddVisitDetails;
