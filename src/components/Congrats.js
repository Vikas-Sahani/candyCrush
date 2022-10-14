import React from "react";
import congrats from "../images/congrats.png";

function Congrats(props) {
  return props.triger ? (
    <div
      style={{
        position: "fixed",
        left: "450px",
        top: "200px",
        width: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "5px solid grey",
        borderRadius: "50px",
        backgroundColor: "Scrollbar",
        zIndex: 1,
      }}
    >
      <img src={congrats} alt="Congrats" />
      <h3>Congratulations, you have cleared</h3>
      <h2>Level {props.level}</h2>
      <h1>& {props.targt} Target</h1>
      <button
        onClick={() => {
          props.setTriger(false);
        }}
      >
        OK
      </button>
    </div>
  ) : (
    ""
  );
}

export default Congrats;
