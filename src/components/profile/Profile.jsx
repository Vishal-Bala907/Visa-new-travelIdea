"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "../redux/slices/UserSlice";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  height: "100vh", // Set height to 100% of viewport
  width: "400px", // Adjust width as needed
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto", // Enable scrolling if content exceeds modal height
  padding: "24px", // Adjust padding for better spacing
};

const variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const Profile = ({ showProfile, setShowProfile }) => {
  const [open, setOpen] = useState(showProfile); // Initially open the modal based on showProfile prop

  const userName = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const phone = useSelector((state) => state.user.phone);
  const handleClose = () => setShowProfile(false);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    // Handle update logic here (e.g., API call)
    // console.log("Updated profile:", { name, email, whatsappNumber });
    handleClose();
  };

  const router = useRouter();
  const handleLogout = () => {
    // Handle logout logic here (e.g., API call)
    localStorage.removeItem("token");
    dispatch(logoutUser());
    router.push("/login");
  };
  return (
    <Modal
      open={showProfile}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Update Your Profile</b>
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="WhatsApp Number"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={handleUpdate}>
            Update
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default Profile;
