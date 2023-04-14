import { Grid } from "@material-ui/core";
import { reactsArray } from "../../../assets/data/reactIcons";

export default function ReactsPopup({ visible, setVisible, reactHandler }) {
  return (
    <>
      {visible && (
        <Grid
          container
          justify="center"
          alignItems="center"
          className="reacts_popup"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
        >
          {reactsArray?.map((react, i) => (
            <Grid item key={i}>
              <div className="react" onClick={() => reactHandler(react.name)}>
                <img src={react?.image} alt="" />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
