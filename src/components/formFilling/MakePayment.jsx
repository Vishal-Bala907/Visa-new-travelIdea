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

  // Calculating appointment fees
  const AppointmentFees = Number(visabyId?.embassyFees?.appointmentFees);
  const TotalAppointmentFees = AppointmentFees * TotalTravellers;
  const EmbassyFess = visabyId?.embassyFees?.fees;
  const serviceFee = Number(visabyId?.serviceFee);
  const TotalServiceFee = serviceFee * TotalTravellers;
  const visaFee = Number(visabyId?.visaFee);
  const TotalvisaFee = visaFee * TotalTravellers;

  console.log("TotalAppointmentFees->", TotalAppointmentFees);
  console.log("TotalServiceFee->", TotalServiceFee);

  let NetTotal = 0;
  let TotalFeesByAge = 0;

  // Create an array to store username and fee for each traveler
  const travelerFees = [];

  // Calculate embassy fees based on age ranges
  if (ages && EmbassyFess) {
    ages.forEach((age, index) => {
      const fee = EmbassyFess.find(
        (fee) => age >= fee.minAge && age <= fee.maxAge
      );
      if (fee) {
        TotalFeesByAge += fee.fees;
        // Store username and fee for this traveler
        travelerFees.push({
          username: usernames[index],
          appointmentFee: AppointmentFees,
          serviceFee: serviceFee,
          embassyFee: fee.fees,
          visaFee: visaFee,
          totalFee: AppointmentFees + serviceFee + visaFee + fee.fees,
        });
      }
    });
  }

  console.log("Traveler Fees ->", travelerFees);
  console.log("TotalFeesByAge->", TotalFeesByAge);

  // Calculating total embassy fees
  NetTotal += TotalAppointmentFees;
  console.log(
    chalk.green.bold("after adding appointment fees->"),
    NetTotal
  );
  NetTotal += TotalFeesByAge;
  console.log(chalk.green.bold("after adding fees by age->"), NetTotal);
  NetTotal += TotalServiceFee;
  console.log(chalk.green.bold("after adding service fee->"), NetTotal);

  NetTotal += TotalvisaFee;
  console.log(chalk.green.bold("after adding TotalvisaFee->"), NetTotal);

  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_eG9FMYxysaEFXV", // Your Razorpay Key ID
      amount: NetTotal * 100, // Amount in paise (50000 paise = INR 500)
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

          {/* Display Traveler Fees */}
          <Box mt={3} mb={3}>
            <Typography variant="h6" component="h2" gutterBottom>
              Traveler Fees:
            </Typography>
            <ul>
              {travelerFees.map((traveler, index) => (
                <ul key={index}>
                  {" "}
                  {/* Incorrect: Nested <ul> without proper structure */}
                  <strong>{traveler.username}</strong>
                  <li>Service Fee: ₹{traveler.serviceFee}</li>
                  <li>appointmentFee Fee: ₹{traveler.appointmentFee}</li>
                  <li>Embassy Fee: ₹{traveler.embassyFee}</li>
                  <li>Visa Fee: ₹{traveler.visaFee}</li>
                  <li>
                    <strong>Total Fee: ₹{traveler.totalFee}</strong>
                  </li>
                </ul>
              ))}
              <strong>Net Total: ₹{NetTotal}</strong>
            </ul>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ marginTop: "20px" }}
          >
            Pay ₹ {NetTotal}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MakePayment;
