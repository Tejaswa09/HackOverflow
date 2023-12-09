import axios from "axios";

import { BACKEND_URI } from "../../config";

import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FileUploader } from "react-drag-drop-files";

import "./style.css";

const style = {
  position: "absolute",
  width: "45vw",
  height: "80vh",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#17202a",
  border: "1px solid rgb(255 255 255/ 20%)",
  borderRadius: "15px",
  boxShadow: 24,
  p: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  "&::before, &::after": {
    content: '""',
  },
};

const CustomModal = () => {
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (file) => setFile(file);

  const postData = async (e) => {
    e.preventDefault();

    if (file === null) {
      console.error("No file selected");
      return;
    }

    let formData = new FormData();
    formData.append("videos", file);

    try {
      const response = await axios.post(`${BACKEND_URI}/upload`, formData);
      console.log("Upload successful", response.data);
    } catch (error) {
      console.error("Error uploading file", error);

    }
  };

  return (
    <>
      <button
        className="flex gap-[0.5rem] justify-center content-center py-[0.5rem] px-[1.2rem] rounded-[14px] text-[1rem] bg-[#FF007A] text-[#000]"
        onClick={handleOpen}
      >
        <FontAwesomeIcon style={{ alignSelf: "center" }} icon={faMicrochip} />
        <span className="font-['Cairo']">Transcribe</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FontAwesomeIcon
            style={{
              position: "absolute",
              top: 15,
              right: 17,
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={handleClose}
            icon={faXmark}
          />
          <div className="w-[100%]">
            <h2 className="font-['Cairo'] text-[#ff007a] text-[2rem] text-center">
              Transcribe your Meetings
            </h2>
            <Divider sx={{ "border-color": "#313942" }} />
          </div>
          <div>
            <p className="text-center">
              Supported Files:{" "}
              <em className="text-[#ff007a] font-[1000]">.mp4</em>
            </p>
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={["MP4"]}
              label=" Upload or Drop a File Right Here"
            />
          </div>
          <div>
            <button
              onClick={postData}
              data-function="post-video"
              className="font-['Cairo'] py-[0.5rem] text-[1.2rem] rounded-[14px] bg-[#FF007A] w-[7rem] mx-[auto] mb-[2rem] text-[#000]"
            >
              Upload
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
