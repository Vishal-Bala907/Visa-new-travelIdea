import React from "react";
import Script from "next/script";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const MakePayment = () => {
  const handlePayment = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_eG9FMYxysaEFXV", // Your Razorpay Key ID
      amount: 50000, // Amount in paise (50000 paise = INR 500)
      currency: "INR",
      name: "Your Company Name",
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
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Your Company Address",
      },
      theme: {
        color: "#3399cc",
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
