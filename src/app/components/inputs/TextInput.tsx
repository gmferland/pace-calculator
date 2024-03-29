import { FunctionalComponent, h } from 'preact';
import style from './style.css';
import { useField, FieldValidator } from 'formik';

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

const TextInput: FunctionalComponent<TextInputProps> = ({
  autoFocus,
  label,
  list,
  listOptions,
  name,
  onFocus,
  placeholder,
  validate,
}) => {
  const [field] = useField<string>({ name, validate });
  return (
    <div class={style['input-container']}>
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

export default TextInput;
