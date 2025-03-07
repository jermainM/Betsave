import React, { useEffect, useRef } from "react";
import { Scrollbar } from "smooth-scrollbar-react";

export const SmoothScrollProvider = (props: { children: React.ReactNode }) => {
  const scrollbar = useRef(null);

  useEffect(() => {
    console.log(scrollbar.current);
  }, []);
  return (
    <div
      className="sample-container"
      style={{ maxHeight: "100vh", display: "flex", width: "100%" }}
    >
      <Scrollbar ref={scrollbar}>{props.children}</Scrollbar>
    </div>
  );
};
