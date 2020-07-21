import { FunctionalComponent, h } from 'preact';
import * as style from './style.css';

interface ActionButtonProps {
  type: string;
  text: string;
  disabled?: boolean;
}

const ActionButton: FunctionalComponent<ActionButtonProps> = ({
  type,
  text,
  disabled,
}) => {
  return (
    <button type={type} class={style.button} disabled={disabled}>
      {text}
    </button>
  );
};

export default ActionButton;
