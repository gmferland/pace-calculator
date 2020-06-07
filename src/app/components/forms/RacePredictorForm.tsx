import { FunctionalComponent, h } from 'preact';
import { FormikProps, withFormik } from 'formik';
import * as style from './style.css';
import TimeInput from '../inputs/TimeInput';
import RadioButtonGroup from '../radioButtonGroup';
import { Unit } from 'common/config';
import ActionButton from '../actionButton';
import {
  parseDistanceInput,
  getCanonicalNameForUnit,
} from 'app/utilities/form';
import TextInput from '../inputs/TextInput';
import { predictRaceTime } from 'common/calculation';

interface RacePredictorFormValues {
  pace: string;
  unit: Unit;
  distance: string;
}

const paceUnits = [
  {
    label: 'per mile',
    value: Unit.Miles,
  },
  {
    label: 'per km',
    value: Unit.Kilometers,
  },
];

const RacePredictorForm: FunctionalComponent<FormikProps<
  RacePredictorFormValues
>> = ({ errors, handleSubmit, isValid, touched }) => {
  return (
    <form class={style.form} onSubmit={handleSubmit}>
      <div class={style.inputRow}>
        <div class={style.pace}>
          <TimeInput name="pace" label="Goal Pace" placeholder="0:00" />
          <RadioButtonGroup
            name="unit"
            options={paceUnits}
            disabled={false}
            size="medium"
          />
        </div>
        <TextInput name="distance" label="Race Distance" placeholder="00 km" />
      </div>
      <div class={style.submitRow}>
        <ActionButton type="submit" text="Calculate" />
        {!isValid && (
          <p>
            {(Object.keys(errors) as any).reduce(
              (acc: string, key: keyof RacePredictorFormValues) => {
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
  updateFinishInfo: (finishInfo: { race: string; time: string }) => any;
}

export default withFormik<WrappedFormProps, RacePredictorFormValues>({
  mapPropsToValues: () => ({
    pace: '',
    unit: Unit.Miles,
    distance: '',
  }),
  validate: values => {
    const errors: Partial<RacePredictorFormValues> = {};

    if (!values.pace) {
      errors.pace = 'Please enter a race pace.';
    } else if (values.pace.length > 8) {
      errors.pace = 'Please enter a pace less than 99 hours.';
    } else if (/[^0-9.:]/.exec(values.pace) !== null) {
      errors.pace = 'Time must only contain positive numbers.';
    }

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

    return errors;
  },
  handleSubmit: (values, formik) => {
    const { distance, unit: distanceUnit } = parseDistanceInput(
      values.distance
    );
    const finishTime = predictRaceTime(
      values.pace,
      1,
      values.unit,
      distance,
      distanceUnit
    );

    const unitText = getCanonicalNameForUnit(distanceUnit);

    formik.props.updateFinishInfo({
      race: `${distance} ${unitText}`,
      time: finishTime,
    });
  },
})(RacePredictorForm);
