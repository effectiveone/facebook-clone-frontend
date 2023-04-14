import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";
import { Box, IconButton, TextareaAutosize } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

export default function EmojiPickerBackgrounds({
  text,
  user,
  setText,
  type2,
  background,
  setBackground,
}) {
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];
  const backgroundHanlder = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };
  const removeBackground = (i) => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };
  const sm = useMediaQuery({
    query: "(max-width:550px)",
  });
  return (
    <Box className={type2 ? "images_input" : ""}>
      <Box className={!type2 ? "flex_center" : ""} ref={bgRef}>
        <TextareaAutosize
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user?.first_name}`}
          className={`post_input ${type2 ? "input2" : ""} ${
            sm && !background && "l0"
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        />
      </Box>
      <Box className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <Box
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </Box>
        )}
        {!type2 && (
          <IconButton
            onClick={() => {
              setShowBgs((prev) => !prev);
            }}
          >
            <ImageIcon />
          </IconButton>
        )}
        {!type2 && showBgs && (
          <Box className="post_backgrounds">
            <Box
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></Box>
            {postBackgrounds?.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHanlder(i);
                }}
              />
            ))}
          </Box>
        )}

        <i
          className={`emoji_icon_large ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </Box>
    </Box>
  );
}
