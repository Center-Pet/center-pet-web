import React from "react";
import "./PawAnimation.css";

const PawAnimation = ({
  width = 60,
  height = 60,
  text = "Aguarde um instante",
  style = {},
  vertical = false,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", ...style }}>
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      style={{ marginBottom: 8 }}
    >
      <g>
        <ellipse cx="30" cy="54" rx="18" ry="5" fill="#f3d6e0" />
        <g
          id="paw"
          className={vertical ? "pawwalk-vertical" : "pawwalk-horizontal"}
        >
          <ellipse cx="30" cy="38" rx="12" ry="9" fill="#D14D72" />
          <ellipse cx="18" cy="28" rx="4" ry="6" fill="#D14D72" />
          <ellipse cx="42" cy="28" rx="4" ry="6" fill="#D14D72" />
          <ellipse cx="22" cy="18" rx="3" ry="4" fill="#D14D72" />
          <ellipse cx="38" cy="18" rx="3" ry="4" fill="#D14D72" />
        </g>
      </g>
    </svg>
    <span style={{ marginTop: 10 }}>{text}</span>
  </div>
);

export default PawAnimation;