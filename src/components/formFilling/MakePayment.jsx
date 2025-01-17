import Script from "next/script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React from "react";
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

  const ages = dateOfBirth?.map((dob) => {
    const date = new Date(dob);
    const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return differenceInYears(new Date(), istDate);
  });

  const visas = useSelector((state) => state.visas?.visas || []);
  const Id = id;

  const visabyId = visas.find((item) => item.id === Number(Id));
  const AppointmentFees = Number(visabyId?.embassyFees?.appointmentFees);
  const TotalAppointmentFees = AppointmentFees * TotalTravellers;
  const EmbassyFess = visabyId?.embassyFees?.fees;
  const serviceFee = Number(visabyId?.serviceFee);
  const TotalServiceFee = serviceFee * TotalTravellers;
  const visaFee = Number(visabyId?.visaFee);
  const TotalvisaFee = visaFee * TotalTravellers;

  let NetTotal = 0;
  let TotalFeesByAge = 0;

  const travelerFees = [];

  if (ages && EmbassyFess) {
    ages.forEach((age, index) => {
      const fee = EmbassyFess.find(
        (fee) => age >= fee.minAge && age <= fee.maxAge
      );
      if (fee) {
        TotalFeesByAge += fee.fees;
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

  NetTotal +=
    TotalAppointmentFees + TotalFeesByAge + TotalServiceFee + TotalvisaFee;

  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_eG9FMYxysaEFXV",
      amount: NetTotal * 100,
      currency: "INR",
      name: "TravelIdea",
      description: "Test Transaction",
      image: "/img/general/logoDark.png",
      handler: function (response) {
        alert(
          `Payment Successful. Payment ID: ${response.razorpay_payment_id}`
        );
      },
      theme: {
        color: "#331749",
      },
    };

    const razorpay = new window.Razorpay(options);
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

          <TableContainer component={Paper} sx={{ marginY: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Traveler</TableCell>
                  <TableCell align="right">Service Fee</TableCell>
                  <TableCell align="right">Appointment Fee</TableCell>
                  <TableCell align="right">Embassy Fee</TableCell>
                  <TableCell align="right">Visa Fee</TableCell>
                  <TableCell align="right">Total Fee</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travelerFees.map((traveler, index) => (
                  <TableRow key={index}>
                    <TableCell>{traveler.username}</TableCell>
                    <TableCell align="right">₹{traveler.serviceFee}</TableCell>
                    <TableCell align="right">
                      ₹{traveler.appointmentFee}
                    </TableCell>
                    <TableCell align="right">₹{traveler.embassyFee}</TableCell>
                    <TableCell align="right">₹{traveler.visaFee}</TableCell>
                    <TableCell align="right">₹{traveler.totalFee}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <strong>Net Total</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>₹{NetTotal}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ marginTop: "20px" }}
          >
            Pay ₹{NetTotal}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default MakePayment;
