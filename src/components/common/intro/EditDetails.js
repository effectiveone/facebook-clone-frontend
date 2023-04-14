import { useRef } from "react";
import Detail from "./Detail";
import useOnCLickOutside from "../../../utils/clickOutside";
import { Box, Grid } from "@material-ui/core";

export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
  setVisible,
}) {
  const modal = useRef(null);
  useOnCLickOutside(modal, () => setVisible(false));
  return (
    <Box className="blur">
      <Box ref={modal} className="postBox infosBox">
        <Grid container direction="column">
          <Grid item className="box_header">
            <Box className="small_circle" onClick={() => setVisible(false)}>
              <i className="exit_icon"></i>
            </Box>
            <span>Edit Details</span>
          </Grid>
          <Grid
            item
            container
            direction="column"
            className="details_wrapper scrollbar"
          >
            <Grid item className="details_col">
              <span>Customize Your Intro</span>
              <span>Details you select will be public</span>
            </Grid>
            <Grid item className="details_header">
              Other Name
            </Grid>
            <Detail
              value={details?.otherName}
              img="studies"
              placeholder="Add other name"
              name="otherName"
              text="other Name"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Grid item className="details_header">
              Work
            </Grid>
            <Detail
              value={details?.job}
              img="job"
              placeholder="Add job title"
              name="job"
              text="a job"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Detail
              value={details?.workplace}
              img="job"
              placeholder="Add a workplace"
              name="workplace"
              text="workplace"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Grid item className="details_header">
              Education
            </Grid>
            <Detail
              value={details?.highSchool}
              img="studies"
              placeholder="Add a high school"
              name="highSchool"
              text="a high school"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Detail
              value={details?.college}
              img="studies"
              placeholder="Add a college"
              name="college"
              text="college"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Grid item className="details_header">
              Current City
            </Grid>
            <Detail
              value={details?.currentCity}
              img="home"
              placeholder="Add a current city"
              name="currentCity"
              text="a current city"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Grid item className="details_header">
              Hometown
            </Grid>
            <Detail
              value={details?.hometown}
              img="home"
              placeholder="Add hometown"
              name="hometown"
              text="hometown"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
            <Grid item className="details_header">
              Relationship
            </Grid>
            <Detail
              value={details?.relationship}
              img="relationship"
              placeholder="Add instagram"
              name="relationship"
              text="relationship"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
              rel
            />
            <Grid item className="details_header">
              Instagram
            </Grid>
            <Detail
              value={details?.instagram}
              img="home"
              placeholder="Add instagram"
              name="instagram"
              text="instagram"
              handleChange={handleChange}
              updateDetails={updateDetails}
              infos={infos}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
