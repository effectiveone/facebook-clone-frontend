import React from "react";
import { Box, Button, Typography } from "@material-ui/core";

export default function PostError({ error, setError }) {
  return (
    <Box className="postError">
      <Typography className="postError_error">{error}</Typography>
      <Button
        variant="contained"
        className="blue_btn"
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </Button>
    </Box>
  );
}
