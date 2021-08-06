import { FunctionalComponent, h } from 'preact';
import style from './style.css';
import { useField } from 'formik';

interface ButtonOption {
  label: string;
  value: any;
}

interface RadioButtonGroupProps {
  name: string;
  options: Array<ButtonOption>;
  disabled: boolean;
  size: 'small' | 'medium';
}

const RadioButtonGroup: FunctionalComponent<RadioButtonGroupProps> = ({
  name,
  options,
  disabled,
  size,
}) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <div class={style['group-container']}>
      {options.map(({ label, value }) => {
        const id = `${name}-${value}`;
        return (
          <div key={id} class={`${style['input-container']} ${style[size]}`}>
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
