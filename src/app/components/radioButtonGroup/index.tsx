import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import { useField } from "formik";

interface ButtonOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  name: string;
  options: Array<ButtonOption>;
  disabled: boolean;
}

const RadioButtonGroup: FunctionalComponent<RadioButtonGroupProps> = ({
  name,
  options,
  disabled
}) => {
  const validate = (value: string) => {
    let error: string | undefined;
    if (!disabled && !value) {
      error = 'Please select a distance unit.';
    }
    return error;
  }
  const [field, meta, helpers] = useField({ name, validate });
  return (
    <div class={style.groupContainer}>
      {options.map(({ label, value }) => {
        const id = `${name}-${value}`;
        return (
          <div key={id} class={style.inputContainer}>
            <input
              type="radio"
              name={name}
              id={id}
              value={value}
              checked={value === field.value}
              onChange={() => helpers.setValue(value)}
              onBlur={() => helpers.setTouched(true)}
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
