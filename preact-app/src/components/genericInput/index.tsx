import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";

interface GenericInputProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  list?: string;
  listOptions?: string[];
}

const GenericInput: FunctionalComponent<GenericInputProps> = ({
  type,
  label,
  name,
  placeholder,
  list,
  listOptions
}) => {
  return (
    <div class={style.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        list={list}
      />
      {list && (
        <datalist id={list}>
          {listOptions?.map(optionName => (
            <option key={optionName} value={optionName}>
              {optionName}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default GenericInput;
