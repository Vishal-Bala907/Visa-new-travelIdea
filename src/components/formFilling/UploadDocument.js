import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Upload } from "lucide-react";

const UploadDocument = ({ setStage }) => {
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  const usernames = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.givenName
  );
  const dummylabels = ["Passport", "Visa", "Photo", "Aadhar", "Other"];
  const [activeTab, setActiveTab] = useState(usernames[0]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (docType, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [docType]: file,
      }));
    }
  };

  const handleUpload = (docType) => {
    const file = uploadedFiles[docType];
    if (file) {
      console.log(`Uploading ${docType}:`, file);
    }
  };

  const handleSaveDetails = () => {

    setStage(4);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>

      {/* Tabs */}
      <div className="mb-4">
        <div className="flex border-b">
          {usernames.map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === label
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {usernames.map((label) => (
          <div
            key={label}
            className={`${activeTab === label ? "block" : "hidden"}`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center gap-4">
                {/* Upload Area */}
                <div className="w-full">
                  <label
                    htmlFor={`file-${label}`}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        {uploadedFiles[label]
                          ? uploadedFiles[label].name
                          : "Click to upload or drag and drop"}
                      </p>
                    </div>
                    <input
                      id={`file-${label}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(label, e)}
                    />
                  </label>
                </div>

                {/* Upload Button */}
                <button
                  onClick={() => handleUpload(label)}
                  disabled={!uploadedFiles[label]}
                  className={`w-full py-2 px-4 rounded-md text-white font-medium
                    ${
                      uploadedFiles[label]
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 cursor-not-allowed"
                    } transition-colors duration-150`}
                >
                  Upload {label}
                </button>

                {/* Save Details Button */}
                <button
                  onClick={handleSaveDetails}
                  className="mt-4 w-full py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 font-medium transition-colors duration-150"
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDocument;
