import { FunctionalComponent, h } from 'preact';
import style from './style.css';
import { useField, FieldValidator } from 'formik';

interface TimeInputProps {
  name: string;
  label: string;
  validate?: FieldValidator;
  placeholder?: string;
  autoFocus?: boolean;
  onFocus?: (e: any) => void;
}

/**
 * Format numeric string with colons.
 * @param value A string containing only numeric digits.
 */
const formatWithColons = (value: string) => {
  if (value.length < 3) {
    return value;
  }
  if (value.length < 5) {
    return `${value.slice(0, -2)}:${value.slice(-2)}`;
  }

  return `${value.slice(0, -4)}:${value.slice(-4, -2)}:${value.slice(-2)}`;
};

/**
 * Format numeric input into duration
 */
const maskInput = (value: string): string => {
  // Handle null/undefined/empty string
  if (!value || value.length === 0) {
    return value;
  }
  // Matches one or two numbers (00) only if followed by a colon and two
  // numbers (:00) exactly 0-2 times. This yields formats of
  // 0, 00, 0:00, 00:00, 0:00:00, 00:00:00
  const formatExpr = /^\d{1,2}(?=(:\d{2}){0,2}$)/;
  if (formatExpr.exec(value) || value.length > 8) {
    // Return value unchanged if it matches our format, or if
    // it's greater than 8 characters (2 second digits, 2 minute
    // digits, 2 hour digits, and 2 colons)
    return value;
  }

  const splitValue = value.split(':');
  // If no colon, add it
  if (splitValue.length === 1) {
    return formatWithColons(value);
  }

  // Else, reposition colons
  const joinedValue = splitValue.join('');
  return formatWithColons(joinedValue);
};

const TimeInput: FunctionalComponent<TimeInputProps> = ({
  autoFocus,
  label,
  onFocus,
  placeholder,

  ...fieldProps
}) => {
  const [field, _meta, helpers] = useField<string>(fieldProps);
  return (
    <div class={style['input-container']}>
      <label htmlFor={field.name}>{label}</label>
      <input
        type="tel"
        id={field.name}
        placeholder={placeholder}
        maxLength={8}
        {...field}
        onChange={(e: any) => {
          const maskedValue = maskInput(e.target.value);
          helpers.setValue(maskedValue);
        }}
        autoFocus={autoFocus}
        onFocus={onFocus}
      />
    </div>
  );
};

export default TimeInput;
