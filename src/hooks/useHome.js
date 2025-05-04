import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";

export const useHome = ({loading}) => {
  const user = useSelector((state) => state.user);
  const middle = useRef(null);
  const [height, setHeight] = useState();
  
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  
  return useMemo(() => ({ 
    height, 
    middle, 
    setHeight, 
    user 
  }), [height, middle, setHeight, user]);
};
