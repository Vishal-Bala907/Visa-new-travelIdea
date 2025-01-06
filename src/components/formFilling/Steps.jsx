"use client";
import * as React from "react";
import Accordion, { accordionClasses } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { step } from "./step";
import PassportForm from "./PassportForm";

export default function Steps() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="flex justify-center align-center w-[50%]  flex-col mx-w-[50%]">
      {/* {step.map((item, idx) => { */}
      {/* return ( */}
      {/* <Accordion>
        <PassportForm />
      </Accordion> */}
      {/* ); */}
      {/* })} */}
    </div>
  );
}
