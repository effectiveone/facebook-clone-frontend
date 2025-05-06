import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
  return (
    <Box className="login_footer" data-testid="footer">
      <Box className="login_footer_wrap" display="flex" flexWrap="wrap">
        <Link to="/">
          <Typography>English(UK)</Typography>
        </Link>
        <Link to="/">
          <Typography>Français(FR)</Typography>
        </Link>
        <Link to="/">
          <Typography>العربية</Typography>
        </Link>
        <Link to="/">
          <Typography>ⵜⴰⵎⴰⵣⵉⵖⵜ</Typography>
        </Link>
        <Link to="/">
          <Typography>Español (España)</Typography>
        </Link>
        <Link to="/">
          <Typography>italiano</Typography>
        </Link>
        <Link to="/">
          <Typography>Deutsch</Typography>
        </Link>
        <Link to="/">
          <Typography>Português (Brasil)</Typography>
        </Link>
        <Link to="/">
          <Typography>हिन्दी</Typography>
        </Link>
        <Link to="/">
          <Typography>中文(简体)</Typography>
        </Link>
        <Link to="/">
          <Typography>日本語</Typography>
        </Link>
        <Link to="/" className="footer_square">
          <i className="plus_icon"></i>
        </Link>
      </Box>
      <Box className="footer_splitter" mt={2} mb={2}></Box>
      <Box className="login_footer_wrap" display="flex" flexWrap="wrap">
        <Link to="/">
          <Typography>Sign Up</Typography>
        </Link>
        <Link to="/">
          <Typography>Log in</Typography>
        </Link>
        <Link to="/">
          <Typography>Messenger</Typography>
        </Link>
        <Link to="/">
          <Typography>Facebook Lite</Typography>
        </Link>
        <Link to="/">
          <Typography>Watch</Typography>
        </Link>
        <Link to="/">
          <Typography>Places</Typography>
        </Link>
        <Link to="/">
          <Typography>Games</Typography>
        </Link>
        <Link to="/">
          <Typography>Marketplace</Typography>
        </Link>
        <Link to="/">
          <Typography>Facebook Pay</Typography>
        </Link>
        <Link to="/">
          <Typography>Oculus</Typography>
        </Link>
        <Link to="/">
          <Typography>Portal</Typography>
        </Link>
        <Link to="/">
          <Typography>Instagram</Typography>
        </Link>
        <Link to="/">
          <Typography>Bulletin</Typography>
        </Link>
        <Link to="/">
          <Typography>Local</Typography>
        </Link>
        <Link to="/">
          <Typography>Fundraisers</Typography>
        </Link>
        <Link to="/">
          <Typography>Services</Typography>
        </Link>
        <Link to="/">
          <Typography>Voting Information Centre</Typography>
        </Link>
        <Link to="/">
          <Typography>Groups</Typography>
        </Link>
        <Link to="/">
          <Typography>About</Typography>
        </Link>
        <Link to="/">
          <Typography>Create ad</Typography>
        </Link>
        <Link to="/">
          <Typography>Create Page</Typography>
        </Link>
        <Link to="/">
          <Typography>Developers</Typography>
        </Link>
        <Link to="/">
          <Typography>Careers</Typography>
        </Link>
        <Link to="/">
          <Typography>Privacy</Typography>
        </Link>
        <Link to="/">
          <Typography>Cookies</Typography>
        </Link>
        <Link to="/">
          <Typography>
            AdChoices <i className="adChoices_icon"></i>
          </Typography>
        </Link>
        <Link to="/">
          <Typography>Terms</Typography>
        </Link>
        <Link to="/">
          <Typography>Help</Typography>
        </Link>
      </Box>
      <Box className="login_footer_wrap" mt={2}>
        <Typography style={{ fontSize: "12px", marginTop: "10px" }}>
          Meta © 2023
        </Typography>
      </Box>
    </Box>
  );
}
