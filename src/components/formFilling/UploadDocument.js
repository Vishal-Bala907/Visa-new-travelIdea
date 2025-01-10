import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state


const dummyLabels=["doc1","doc2","doc3"];
function UploadDocument() {

  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);

  console.log("Visa Requests Data:", visaRequests);

  return (
    <div>
      <h1>Upload Document</h1>
   
    </div>
  );
}

export default UploadDocument;
