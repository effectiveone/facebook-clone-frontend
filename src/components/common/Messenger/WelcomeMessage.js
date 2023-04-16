import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./WelcomeMessage.scss";

const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const WelcomeMessage = () => {
  return (
    <Wrapper className="welcome-message-container">
      <Typography variant="h6" className="welcome-message-text">
        To start chatting - choose conversation
      </Typography>
    </Wrapper>
  );
};

export default WelcomeMessage;
