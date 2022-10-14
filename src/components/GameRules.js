import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/candyLogo.jpg";
export default function GameRule(props) {
  const navigateFn = useNavigate();
  return (
    <>
      <h1>
        <img src={logoImg} alt="cnadyLogo" />
      </h1>
      <div className="gameRules">
        <ul>
          <h3>Game Rules</h3>

          <li>
            Drag and Drop only left side, top side, right side and bottom side.
            And you can only drag and Drop the candys for one step.
          </li>
          <li>
            If 3 rows or columns are matched then score will increase by 3.
          </li>
          <li>
            If 4 rows or columns are matched then score will increase by 4
          </li>
          <li>
            If 5 rows or columns are matched then score will increase by 5
          </li>
        </ul>
        <button
          onClick={function () {
            navigateFn("/mainGame");
            props.setTriger(true);
          }}
        >
          Let's Play
        </button>
      </div>
    </>
  );
}
