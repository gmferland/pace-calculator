import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import { useField, FieldValidator } from "formik";

interface TextInputProps {
  name: string;
  label: string;
  validate?: FieldValidator;
  placeholder?: string;
  list?: string;
  listOptions?: string[];
  autoFocus?: boolean;
  onFocus?: (e: any) => void;
}

const GenericInput: FunctionalComponent<TextInputProps> = ({
  autoFocus,
  label,
  list,
  listOptions,
  onFocus,
  placeholder,
  ...fieldProps
}) => {
  const [field, meta, helpers] = useField<string>(fieldProps);
  return (
    <div class={style.inputContainer}>
      <label htmlFor={field.name}>{label}</label>
      <input
        type="text"
        id={field.name}
        placeholder={placeholder}
        list={list}
        {...field}
        autoFocus={autoFocus}
        onFocus={onFocus}
      />
      {list && (
        <datalist id={list}>
          {listOptions &&
            listOptions.map(optionName => (
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
