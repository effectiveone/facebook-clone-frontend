import {
  useMediaQuery, // Keep this import from Material-UI
  Box,
  Grid,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles"; // Add this import

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}) {
  const theme = useTheme(); // Add this line
  const view3 = useMediaQuery(theme.breakpoints.up("lg")); // Update this line

  return (
    <Box className="reg_grid" marginBottom={dateError && !view3 ? "90px" : "0"}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Select name="bDay" value={bDay} onChange={handleRegisterChange}>
            {days.map((day, i) => (
              <MenuItem value={day} key={i}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
            {months.map((month, i) => (
              <MenuItem value={month} key={i}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Select name="bYear" value={bYear} onChange={handleRegisterChange}>
            {years.map((year, i) => (
              <MenuItem value={year} key={i}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {dateError && (
        <Paper
          elevation={3}
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <Box display="flex" alignItems="center" justifyContent="center" p={1}>
            <Box
              className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
              mr={1}
            ></Box>
            <Typography variant="body2">{dateError}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
