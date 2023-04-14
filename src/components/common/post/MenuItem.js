import { Box, Typography } from "@material-ui/core";

export default function MenuItem({ icon, title, subtitle, img }) {
  return (
    <Box display="flex" alignItems="center" className="hover1">
      {img ? (
        <Box marginRight="10px">
          <img src={img} alt="" />
        </Box>
      ) : (
        <i className={icon}></i>
      )}
      <Box display="flex" flexDirection="column">
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
