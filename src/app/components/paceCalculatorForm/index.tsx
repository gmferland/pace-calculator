import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { FormikProps, withFormik } from 'formik';
import * as style from './style.css';
import ActionButton from '../actionButton';
import TextInput from '../inputs/TextInput';
import TimeInput from '../inputs/TimeInput';
import RadioButtonGroup from '../radioButtonGroup';
import { raceOptions, units } from '../../../common/config';
import { FormattedSplit, getSplits } from '../../../common/calculation';
import { saveState } from '../../utilities/storage';
import { setMetaTags } from '../../utilities/url';

export interface PaceCalculatorFormValues {
  distance: string;
  unit: string;
  time: string;
}

const PaceCalculatorForm: FunctionalComponent<FormikProps<
  PaceCalculatorFormValues
>> = ({
  errors,
  handleSubmit,
  isValid,
  status,
  setFieldValue,
  setStatus,
  touched,
  values,
}) => {
  useEffect(() => {
    // Unit input is not required if the user selects a known/configured race distance
    const matchingRace = raceOptions.find(
      race => race.name === values.distance
    );
    setStatus({ isUnitDisabled: !!matchingRace });
    if (matchingRace) {
      setFieldValue('unit', '');
    }
  }, [values.distance, setStatus, setFieldValue]);

  return (
    <form class={style.form} onSubmit={handleSubmit}>
      <div class={style.inputRow}>
        <div class={style.distance}>
          <TextInput
            name="distance"
            label="Distance"
            placeholder="Enter Distance"
            list="distance-options"
            listOptions={raceOptions.map(({ name }) => name)}
          />
          <div>
            <RadioButtonGroup
              name="unit"
              options={units.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
              disabled={status.isUnitDisabled}
            />
          </div>
        </div>
        <TimeInput name="time" label="Goal Time" placeholder="Enter Time" />
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
    const calculatedSplits = getSplits(
      values.distance,
      values.unit,
      values.time
    );
    formik.props.updateSplits(calculatedSplits);
    saveState(values.distance, values.unit, values.time);
    setMetaTags();
  },
})(PaceCalculatorForm);