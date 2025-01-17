import Script from "next/script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { differenceInYears } from "date-fns";
import chalk from "chalk";
const MakePayment = ({ setStage, id }) => {
  const dispatch = useDispatch();
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  console.log("visaRequests2", visaRequests);

  const firstname = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.givenName
  );
  const lastname = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.surname
  );
  const usernames = firstname.map(
    (name, index) => name + " " + lastname[index]
  );

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

  const visas = useSelector((state) => state.visas?.visas || []);
  const Id = id;

  const visabyId = visas.find((item) => item.id === Number(Id));
  console.log("visabyId2", visabyId);
  //calculating appointment fees
  const AppointmentFees = Number(visabyId?.embassyFees?.appointmentFees);
  const TotalAppointmentFees = AppointmentFees * TotalTravellers;
  const EmbassyFess = visabyId?.embassyFees?.fees;
  const serviceFee = Number(visabyId?.serviceFee);
  const TotalServiceFee = serviceFee * TotalTravellers;

  console.log("TotalAppointmentFees->", TotalAppointmentFees);
  console.log("TotalServiceFee->", TotalServiceFee);
  var TotalEmbassyFees = 0;
  var TotalFeesByAge = 0;
  var fees;
  // calculate embassy fees based on age ranges
  if (ages && EmbassyFess) {
    ages.forEach((age) => {
      const fee = EmbassyFess.find((fee) => {
        return age >= fee.minAge && age <= fee.maxAge;
      });
      if (fee) {
        TotalFeesByAge += fee.fees;
      }
    });
  }
  console.log("TotalFeesByAge->", TotalFeesByAge);
  // calculating total embassy fees
  TotalEmbassyFees += TotalAppointmentFees;
  console.log(
    chalk.green.bold("after adding appointment fees->"),
    TotalEmbassyFees
  );
  TotalEmbassyFees += TotalFeesByAge;
  console.log(chalk.green.bold("after adding fees by age->"), TotalEmbassyFees);
   TotalEmbassyFees += TotalServiceFee;
  console.log(chalk.green.bold("after adding service fee->"), TotalEmbassyFees);
  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_eG9FMYxysaEFXV", // Your Razorpay Key ID
      amount: TotalEmbassyFees * 100, // Amount in paise (50000 paise = INR 500)
      currency: "INR",
      name: "TravelIdea",
      description: "Test Transaction",
      image: "/img/general/logoDark.png",
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
            Pay Rs {TotalEmbassyFees}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MakePayment;
