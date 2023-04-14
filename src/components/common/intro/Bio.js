import {
  Box,
  Grid,
  TextareaAutosize,
  Select,
  MenuItem,
} from "@material-ui/core";

export default function Bio({
  infos,
  handleChange,
  max,
  setShowBio,
  updateDetails,
  placeholder,
  name,
  detail,
  setShow,
  rel,
}) {
  return (
    <Box className="add_bio_wrap">
      {rel ? (
        <Select
          className="select_rel"
          name={name}
          value={infos.relationship}
          onChange={handleChange}
        >
          <MenuItem value="Single">Single</MenuItem>
          <MenuItem value="In a relationship">In a relationship</MenuItem>
          <MenuItem value="Married">Married</MenuItem>
          <MenuItem value="Divorced">Divorced</MenuItem>
        </Select>
      ) : (
        <TextareaAutosize
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={detail ? 25 : 100}
          className="textarea_blue details_input"
          onChange={handleChange}
        ></TextareaAutosize>
      )}
      {!detail && <Box className="remaining">{max} characters remaining</Box>}
      <Grid container justifyContent="space-between">
        <Grid item>
          <Box className="flex_left">
            <i className="public_icon"></i>Public
          </Box>
        </Grid>
        <Grid item>
          <Box className="flex_right">
            <button
              className="gray_btn"
              onClick={() => (!detail ? setShowBio(false) : setShow(false))}
            >
              Cancel
            </button>
            <button
              className="blue_btn"
              onClick={() => {
                updateDetails();
                setShow(false);
              }}
            >
              Save
            </button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
