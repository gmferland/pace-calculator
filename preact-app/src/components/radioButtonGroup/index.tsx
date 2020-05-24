import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface ButtonOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  name: string;
  options: Array<ButtonOption>;
}

const RadioButtonGroup: FunctionalComponent<RadioButtonGroupProps> = ({
  name,
  options
}) => {
  return (
    <div class={style.groupContainer}>
      {options.map(({ label, value }) => {
        const id = `${name}-${value}`;
        return (
          <div key={id} class={style.inputContainer}>
            <input type="radio" name={name} id={id} value={value} />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
