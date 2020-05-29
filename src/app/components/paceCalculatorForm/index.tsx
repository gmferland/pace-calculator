import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useFormik, Field } from 'formik';
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

interface PaceCalculatorFormProps {
  initialValues: PaceCalculatorFormValues;
  updateSplits: (splits: FormattedSplit[]) => any;
}

const PaceCalculatorForm: FunctionalComponent<PaceCalculatorFormProps> = ({
  initialValues,
  updateSplits,
}) => {
  const [isUnitDisabled, setUnitDisabled] = useState(true);
  const formik = useFormik({
    initialValues,
    validate: (values: PaceCalculatorFormValues) => {
      const errors: Partial<PaceCalculatorFormValues> = {};
      if (!values.distance) {
        errors.distance = 'Please enter a race distance.';
      }

      if (!isUnitDisabled && !values.unit) {
        errors.unit = 'Please select a distance unit.';
      }

      if (!values.time) {
        errors.time = 'Please enter a race time.';
      } else if (/[^0-9.:]/.exec(values.time) !== null) {
        errors.time = 'Time must only contain positive numbers.';
      }

      return errors;
    },
    onSubmit: (values: PaceCalculatorFormValues) => {
      // TODO: see if there's a better way to handle disabled value in Formik
      const unit = isUnitDisabled ? '' : values.unit;
      const calculatedSplits = getSplits(values.distance, unit, values.time);
      updateSplits(calculatedSplits);
      saveState(values.distance, unit, values.time);
      setMetaTags();
    },
  });
  useEffect(() => {
    // Unit input is not required if the user selects a known/configured race distance
    const matchingRace = raceOptions.find(
      race => race.name === formik.values.distance
    );
    setUnitDisabled(!!matchingRace);
  }, [raceOptions, formik.values.distance, setUnitDisabled]);

  const isFormDirty =
    (formik.touched.distance && !!formik.errors.distance) ||
    (!isUnitDisabled && formik.touched.unit && !!formik.errors.unit) ||
    (formik.touched.time && !!formik.errors.time);

  return (
    <form class={style.form} onSubmit={formik.handleSubmit}>
      <div class={style.inputRow}>
        <div class={style.distance}>
          <GenericInput
            type="text"
            name="distance"
            label="Distance"
            value={formik.values.distance}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Distance"
            list="distance-options"
            listOptions={raceOptions.map(({ name }) => name)}
          />
          <RadioButtonGroup
            name="unit"
            value={isUnitDisabled ? '' : formik.values.unit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            options={units.map(({ name, id }) => ({ label: name, value: id }))}
            disabled={isUnitDisabled}
          />
        </div>
        <GenericInput
          type="text"
          name="time"
          label="Goal Time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter Time"
        />
      </div>
      <div class={style.submitRow}>
        <ActionButton type="submit" text="Calculate" disabled={isFormDirty} />
        {isFormDirty && (
          <p>
            {(Object.keys(formik.errors) as any).reduce(
              (acc: string, key: keyof PaceCalculatorFormValues) => {
                if (formik.errors[key]) {
                  return `${acc} ${formik.errors[key]}`;
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

export default PaceCalculatorForm;
