"use client";
import * as React from "react";

import PassportForm from "./PassportForm";
import { Box } from "@mui/material";

export default function Steps() {
  // const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box>
      <PassportForm />
    </Box>
  );
}
