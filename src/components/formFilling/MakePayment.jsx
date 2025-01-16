import Script from "next/script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInYears } from "date-fns";

const MakePayment = ({ setStage, id }) => {
  const dispatch = useDispatch();
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  console.log("visaRequests2", visaRequests);
  const dateOfBirth = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.dateOfBirth
  );
  const TotalTravellers = visaRequests?.visaRequest?.length;

  // Calculate ages using IST
  const ages = dateOfBirth?.map((dob) => {
    const date = new Date(dob); // Convert string to Date object
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000); // Adjust to IST (UTC+5:30)
    return differenceInYears(new Date(), istDate); // Calculate age
  });

  console.log("Ages in IST ->", ages);

  //calculating appointment fees

  const visas = useSelector((state) => state.visas?.visas || []);
  const Id = id;


  const visabyId = visas.find((item) => item.id === Number(Id));
  console.log("visabyId2", visabyId);
  const AppointmentFees = Number(visabyId?.embassyFees?.appointmentFees);
  const TotalAppointmentFees = AppointmentFees * TotalTravellers;
  const EmbassyFess = visabyId?.embassyFees?.fees;
  const TotalEmbassyFess = EmbassyFess * TotalTravellers;

  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_eG9FMYxysaEFXV", // Your Razorpay Key ID
      amount: 50000, // Amount in paise (50000 paise = INR 500)
      currency: "INR",
      name: "TravelIdea",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // Optional: Your company logo URL
      handler: function (response) {
        // Handle payment success here
        console.log("Payment Successful!", response);
        alert(
          `Payment Successful. Payment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Travelidea, XYZ Street, New Delhi, India",
      },
      theme: {
        color: "#331749",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      console.error("Payment Failed", response.error);
      alert(`Payment Failed. Reason: ${response.error.description}`);
    });

    razorpay.open();
  };


  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
          mt={10}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Make Payment
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ marginTop: "20px" }}
          >
            Pay 500
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MakePayment;
