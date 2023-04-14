import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../../utils/clickOutside";
import { deletePost, savePost } from "../../../store/actions/postsActions";
import { saveAs } from "file-saver";
import { Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const dispatch = useDispatch();
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));
  const saveHandler = async () => {
    dispatch(savePost(postId, token));
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };
  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };
  const deleteHandler = async () => {
    const res = await dispatch(deletePost(postId, token));
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  return (
    <Box component="ul" className="post_menu" ref={menu}>
      <Grid container spacing={0}>
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="pin_icon" title="Pin Post" />
          </Grid>
        )}
        <Grid item xs={12}>
          <div onClick={() => saveHandler()}>
            {checkSaved ? (
              <MenuItem
                icon="save_icon"
                title="Unsave Post"
                subtitle="Remove this from your saved items."
              />
            ) : (
              <MenuItem
                icon="save_icon"
                title="Save Post"
                subtitle="Add this to your saved items."
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Box borderBottom={1} borderColor="grey.300" marginY={2} />
        </Grid>
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="edit_icon" title="Edit Post" />
          </Grid>
        )}
        {!test && (
          <Grid item xs={12}>
            <MenuItem
              icon="turnOnNotification_icon"
              title="Turn on notifications for this post"
            />
          </Grid>
        )}
        {imagesLength && (
          <Grid item xs={12}>
            <div onClick={() => downloadImages()}>
              <MenuItem icon="download_icon" title="Download" />
            </div>
          </Grid>
        )}
        {imagesLength && (
          <Grid item xs={12}>
            <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem img="../../../icons/lock.png" title="Edit audience" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem
              icon="turnOffNotifications_icon"
              title="Turn off notifications for this post"
            />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="delete_icon" title="Turn off translations" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="date_icon" title="Edit Date" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="refresh_icon" title="Refresh share attachment" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <MenuItem icon="archive_icon" title="Move to archive" />
          </Grid>
        )}
        {test && (
          <Grid item xs={12}>
            <Box borderTop={1} borderColor="grey.300" marginY={2} />
            <MenuItem
              icon="trash_icon"
              title="Move to trash"
              subtitle="items in your trash are deleted after 30 days"
            />
          </Grid>
        )}
        {!test && <Box borderBottom={1} borderColor="grey.300" marginY={2} />}
        {!test && (
          <Box paddingY={2}>
            <MenuItem
              img="../../../icons/report.png"
              title="Report post"
              subtitle="i'm concerned about this post"
            />
          </Box>
        )}
      </Grid>
    </Box>
  );
}
