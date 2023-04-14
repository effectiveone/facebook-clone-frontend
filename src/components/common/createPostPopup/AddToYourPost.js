import { IconButton } from "@material-ui/core";
import {
  AddAPhoto,
  LocationOnOutlined,
  MicNoneOutlined,
  MoreHoriz,
  TagFacesOutlined,
} from "@material-ui/icons";

export default function AddToYourPost({ setShowPrev }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <IconButton
        className="post_header_right hover1"
        onClick={() => setShowPrev(true)}
      >
        <AddAPhoto style={{ color: "#45bd62" }} />
      </IconButton>
      <IconButton className="post_header_right hover1">
        <TagFacesOutlined />
      </IconButton>
      <IconButton className="post_header_right hover1">
        <MicNoneOutlined />
      </IconButton>
      <IconButton className="post_header_right hover1">
        <LocationOnOutlined />
      </IconButton>
      <IconButton className="post_header_right hover1">
        <MoreHoriz style={{ color: "#65676b" }} />
      </IconButton>
    </div>
  );
}
