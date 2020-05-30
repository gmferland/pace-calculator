import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { FormikProps, withFormik } from 'formik';
import * as style from './style.css';
import ActionButton from '../actionButton';
import GenericInput from '../genericInput';
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
  handleBlur,
  handleChange,
  handleSubmit,
  isValid,
  status,
  setFieldValue,
  setStatus,
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
  }, [raceOptions, values.distance, setStatus]);

  return (
    <form class={style.form} onSubmit={handleSubmit}>
      <div class={style.inputRow}>
        <div class={style.distance}>
          <GenericInput
            type="text"
            name="distance"
            label="Distance"
            value={values.distance}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter Distance"
            list="distance-options"
            listOptions={raceOptions.map(({ name }) => name)}
          />
          <RadioButtonGroup
            name="unit"
            value={values.unit}
            onChange={handleChange}
            onBlur={handleBlur}
            options={units.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
            disabled={status.isUnitDisabled}
          />
        </div>
        <GenericInput
          type="text"
          name="time"
          label="Goal Time"
          value={values.time}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter Time"
        />
      </div>
      <div class={style.submitRow}>
        <ActionButton type="submit" text="Calculate" disabled={!isValid} />
        {!isValid && (
          <p>
            {(Object.keys(errors) as any).reduce(
              (acc: string, key: keyof PaceCalculatorFormValues) => {
                if (errors[key]) {
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
  validate: (values) => {
    const errors: Partial<PaceCalculatorFormValues> = {};
    if (!values.distance) {
      errors.distance = 'Please enter a race distance.';
    }

    // TODO: unit validation
    /* if (!props.isUnitDisabled && !values.unit) {
      errors.unit = 'Please select a distance unit.';
    } */

    if (!values.time) {
      errors.time = 'Please enter a race time.';
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
