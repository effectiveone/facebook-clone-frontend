import { useMediaQuery } from "react-responsive";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

export default function GenderSelect({ handleRegisterChange, genderError }) {
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });

  return (
    <Box
      className="reg_grid"
      display="flex"
      flexDirection={view3 ? "row" : "column"}
      alignItems={view3 ? "center" : undefined}
      marginBottom={genderError && !view3 ? "70px" : "0"}
    >
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="custom" control={<Radio />} label="Custom" />
      {genderError && (
        <Box
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <Box
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></Box>
          <Typography>{genderError}</Typography>
        </Box>
      )}
    </Box>
  );
}
