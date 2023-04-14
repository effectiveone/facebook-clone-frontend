import { useState } from "react";
import Bio from "./Bio";
import { Box, Grid } from "@material-ui/core";

export default function Detail({
  img,
  value,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  rel,
}) {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Grid
        container
        alignItems="center"
        className="add_details_flex"
        onClick={() => setShow(true)}
      >
        {value ? (
          <Grid item xs={12} sm="auto" className="info_profile">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} sm="auto">
              <i className="rounded_plus_icon"></i>
            </Grid>
            <Grid item xs={12} sm="auto" className="underline">
              Add {text}
            </Grid>
          </>
        )}
      </Grid>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShow={setShow}
          rel={rel}
        />
      )}
    </Box>
  );
}
