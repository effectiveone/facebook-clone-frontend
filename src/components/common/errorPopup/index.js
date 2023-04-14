import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../../utils/clickOutside";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorPopup() {
  const dispatch = useDispatch();
  const errorPopup = useRef(null);
  const { error } = useSelector((state) => ({ ...state }));
  useClickOutside(errorPopup, () => {});
  return (
    <Box className="blur" id="errorPopup">
      <Box className="postBox" ref={errorPopup} id="erroPost1">
        <Box className="box_header">
          <IconButton className="small_circle">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{error?.header}</Typography>
        </Box>
        <Typography className="error_body">{error?.error}</Typography>
      </Box>
    </Box>
  );
}
