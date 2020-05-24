import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface ActionButtonProps {
  type: string;
  text: string;
}

const ActionButton: FunctionalComponent<ActionButtonProps> = ({
  type,
  text
}) => {
  return (
    <button type={type} class={style.button}>
      {text}
    </button>
  );
};

export default ActionButton;
