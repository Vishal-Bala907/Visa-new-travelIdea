import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const UpdateImage = ({ currentImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${currentImageUrl}`
  );

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateClick = () => {
    // onUpdateImage(selectedImage);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        padding: 4,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Image
      </Typography>

      {/* Image Preview */}
      {previewImageUrl && (
        <Box sx={{ mb: 2 }}>
          <img
            src={previewImageUrl}
            alt="Preview"
            style={{ width: "100%", height: "auto", borderRadius: 8 }}
          />
        </Box>
      )}

      {/* File Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="imageUpload"
      />
      <label htmlFor="imageUpload">
        <Button variant="outlined" component="span" sx={{ mb: 2 }}>
          Choose Image
        </Button>
      </label>

      {/* Update Button */}
      <Button
        variant="contained"
        onClick={handleUpdateClick}
        disabled={!selectedImage}
        fullWidth
      >
        Update Image
      </Button>
    </Box>
  );
};

export default UpdateImage;
