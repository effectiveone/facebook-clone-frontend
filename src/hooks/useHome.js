import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export const useHome = ({loading}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  return { height, middle, setHeight, user };
};
