import React from "react";
import { HoverForm } from "./utility";

let ConfirmPopup: React.FC<{
  active: boolean,
  message: string,
  payload: any,
  onConfirm: (payload: any) => void,
  onCancel: () => void,
}> = function (props) {
  return <HoverForm active={props.active} submit={props.onConfirm}
    close={props.onCancel}>
    <p>
      {props.message}
      <br /><br />
    </p>
    <div className="d-flex jc-end">
      <button className="btn" onClick={function (e) {
        e.preventDefault();
        props.onConfirm(props.payload);
        props.onCancel();
      }}>Yes</button>
      <button className="btn" onClick={function (e) {
        e.preventDefault();
        props.onCancel();
      }}>No</button>
    </div>
  </HoverForm>;
}

export default ConfirmPopup;