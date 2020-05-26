import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface ButtonOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  name: string;
  value: string;
  onChange: (event: any) => any;
  options: Array<ButtonOption>;
  disabled: boolean;
}

const RadioButtonGroup: FunctionalComponent<RadioButtonGroupProps> = ({
  name,
  value: groupValue,
  onChange,
  options,
  disabled
}) => {
  return (
    <div class={style.groupContainer}>
      {options.map(({ label, value: myValue }) => {
        const id = `${name}-${myValue}`;
        return (
          <div key={id} class={style.inputContainer}>
            <input
              type="radio"
              name={name}
              id={id}
              value={myValue}
              checked={myValue === groupValue}
              onChange={onChange}
              disabled={disabled}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        );
      })}
    </div>
  );
};

export default RadioButtonGroup;
