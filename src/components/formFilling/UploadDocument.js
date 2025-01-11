import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Upload } from "lucide-react";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";

const UploadDocument = ({ setStage }) => {
  const visaRequests = useSelector((state) => state.visaRequest.visaRequests);
  const usernames = visaRequests?.visaRequest?.map(
    (item) => item?.request?.visa?.givenName
  );
  const dummylabels = ["Passport", "Visa", "Photo", "Aadhar", "Other"];
  const [activeTab, setActiveTab] = useState(usernames[0]);
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (username, docType, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => ({
        ...prev,
        [username]: {
          ...prev[username],
          [docType]: file,
        },
      }));
    }
  };

  const handleDeleteImage = (username, docType) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev };
      if (newFiles[username]) {
        delete newFiles[username][docType];
      }
      return newFiles;
    });
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
        {usernames.map((username) => (
          <div
            key={username}
            className={`${activeTab === username ? "block" : "hidden"}`}
          >
            <div className="bg-white rounded-lg shadow p-6">
              {dummylabels.map((docType) => (
                <div
                  key={docType}
                  className="flex flex-col items-center gap-4 mb-6"
                >
                  <h2 className="text-lg font-medium">{docType}</h2>
                  {/* Upload Area */}
                  {!uploadedFiles[username]?.[docType] ? (
                    <div className="w-full">
                      <label
                        htmlFor={`file-${username}-${docType}`}
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            Click to upload or drag and drop
                          </p>
                        </div>
                        <input
                          id={`file-${username}-${docType}`}
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            handleFileChange(username, docType, e)
                          }
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="relative mt-4">
                      <Image
                        src={URL.createObjectURL(
                          uploadedFiles[username][docType]
                        )}
                        alt="Uploaded"
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleDeleteImage(username, docType)}
                        className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-150"
                      >
                        <FaRegTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={handleSaveDetails}
                className="mt-4 w-full py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 font-medium transition-colors duration-150"
              >
                Save Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDocument;
