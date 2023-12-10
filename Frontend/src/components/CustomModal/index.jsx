import axios from "axios";

// import { BACKEND_URI } from "../../config";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faXmark } from "@fortawesome/free-solid-svg-icons";

import { FileUploader } from "react-drag-drop-files";

import "./style.css";

const CustomModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (file) => setFile(file);

  // ##################################
  const navigate = useNavigate();
  const url = "http://localhost:3500/api/v1/final";
  // const redirecturi = "http://localhost:5173/transcribe";

  const handleTransribe = async () => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        window.summary = response.data.summary;
        window.executionTime = response.data.executionTime;
        navigate("/transcribe");
      }
    } catch (error) {
      console.error("Error in transcribing:", error);
    }
  };
  // ##################################

  // Not Tested
  console.log(file);

  const style = {
    position: "absolute",
    width: "45vw",
    height: "80vh",
    top: "45%",
    left: "48%",
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

  return (
    <>
      <button
        className="flex gap-[0.5rem] justify-center items-center py-[0.5rem] px-[1.2rem] rounded-[14px] text-[1rem] bg-[#FF007A] text-[#000]"
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
          <div className="flex gap-[2rem]">
            <button
              // onClick={postData}
              data-function="post-video"
              className="font-['Cairo'] py-[0.5rem] text-[1rem] rounded-[14px] bg-[#FF007A] w-[7rem] mx-[auto] mb-[2rem] text-[#000]"
            >
              Upload
            </button>
            <button
              className=" font-['Cairo'] py-[0.5rem] text-[1rem] rounded-[14px] bg-[#FF007A] w-[7rem] mx-[auto] mb-[2rem] text-[#000]"
              onClick={handleTransribe}
            >
              <FontAwesomeIcon
                style={{ alignSelf: "center" }}
                icon={faMicrochip}
              />
              <span className="font-['Cairo']">Transcribe</span>
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default CustomModal;
