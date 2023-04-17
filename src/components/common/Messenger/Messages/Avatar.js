import React from "react";
import { styled } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#5865f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  color: "white",
});

const Avatar = ({ username, large }) => {
  const initials = username
    ? username.length > 1
      ? username.substring(0, 2)
      : username
    : "";

  return (
    <Tooltip title={username} placement="left">
      <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
        {initials}
      </AvatarPreview>
    </Tooltip>
  );
};

export default Avatar;
