import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import { Box, Button, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      console.log(img);
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };
  return (
    <Box className="overflow_a scrollbar">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <Box className="add_pics_wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <Box className="add_pics_inside1 p0">
            <Box className="preview_actions">
              <Button className="hover1" startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button
                className="hover1"
                startIcon={<AddPhotoAlternateIcon />}
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                Add Photos/Videos
              </Button>
            </Box>
            <IconButton
              className="small_white_circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <CloseIcon />
            </IconButton>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
                <img src={img} key={i} alt="" />
              ))}
            </div>
          </Box>
        ) : (
          <Box className="add_pics_inside1">
            <IconButton
              className="small_white_circle"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <IconButton className="add_circle">
                <AddPhotoAlternateIcon />
              </IconButton>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </Box>
          </Box>
        )}
        <Box className="add_pics_inside2">
          <IconButton className="add_circle">
            <PhoneIcon />
          </IconButton>
          <div className="mobile_text">Add photos from your mobile device.</div>
          <Button className="addphone_btn">Add</Button>
        </Box>
      </Box>
    </Box>
  );
}
