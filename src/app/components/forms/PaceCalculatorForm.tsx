import { FunctionalComponent, h } from 'preact';
import { FormikProps, withFormik } from 'formik';
import * as style from './style.css';
import ActionButton from '../actionButton';
import TextInput from '../inputs/TextInput';
import TimeInput from '../inputs/TimeInput';
import { raceOptions, Unit } from '../../../common/config';
import { FormattedSplit, getSplits } from '../../../common/calculation';
import { saveState } from '../../utilities/storage';
import { setImageMetaTags } from '../../utilities/url';
import { parseDistanceInput } from 'app/utilities/form';

export interface PaceCalculatorFormValues {
  distance: string;
  time: string;
}

const PaceCalculatorForm: FunctionalComponent<FormikProps<
  PaceCalculatorFormValues
>> = ({ errors, handleSubmit, isValid, touched }) => {
  return (
    <form class={style.form} onSubmit={handleSubmit}>
      <div class={style.inputRow}>
        <div class={style.distance}>
          <TextInput
            name="distance"
            label="Distance"
            placeholder="00 km"
            list="distance-options"
            listOptions={raceOptions.map(({ name }) => name)}
          />
        </div>
        <TimeInput name="time" label="Goal Time" placeholder="0:00" />
      </div>
      <div class={style.submitRow}>
        <ActionButton type="submit" text="Calculate" />
        {!isValid && (
          <p>
            {(Object.keys(errors) as any).reduce(
              (acc: string, key: keyof PaceCalculatorFormValues) => {
                if (errors[key] && touched[key]) {
                  return `${acc} ${errors[key]}`;
                }
                return acc;
              },
              ''
            )}
          </p>
        )}
      </div>
    </form>
  );
};

interface WrappedFormProps {
  initialValues: PaceCalculatorFormValues;
  updateSplits: (splits: FormattedSplit[]) => any;
}

export default withFormik({
  mapPropsToValues: (props: WrappedFormProps) => ({
    ...props.initialValues,
  }),
  mapPropsToStatus: () => ({
    isUnitDisabled: false,
  }),
  validate: values => {
    const errors: Partial<PaceCalculatorFormValues> = {};
    if (!values.distance) {
      errors.distance = 'Please enter a race distance.';
    } else {
      const { distance, unit } = parseDistanceInput(values.distance);
      if (distance < 0) {
        errors.distance = 'Please enter a race distance.';
      }
      if (unit === Unit.Unknown) {
        errors.distance = 'Please specify a distance unit.';
      }
    }

    if (!values.time) {
      errors.time = 'Please enter a race time.';
    } else if (values.time.length > 8) {
      errors.time = 'Please enter a time less than 99 hours.';
    } else if (/[^0-9.:]/.exec(values.time) !== null) {
      errors.time = 'Time must only contain positive numbers.';
    }

    return errors;
  },
  handleSubmit: (values, formik) => {
    const { distance, unit } = parseDistanceInput(values.distance);
    const calculatedSplits = getSplits(distance, unit, values.time);
    formik.props.updateSplits(calculatedSplits);
    saveState(distance, unit, values.time);
    setImageMetaTags();
  },
})(PaceCalculatorForm);
