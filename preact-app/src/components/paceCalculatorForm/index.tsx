import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useFormik } from "formik";
import * as style from "./style.css";
import ActionButton from "../actionButton";
import GenericInput from "../genericInput";
import RadioButtonGroup from "../radioButtonGroup";
import { raceOptions, units } from "../../../common/config";
import { FormattedSplit, getSplits } from "../../../common/calculation";
import { saveState } from "../../utilities/storage";

export interface PaceCalculatorFormValues {
  distance: string;
  unit: string;
  time: string;
}

interface PaceCalculatorFormProps {
  initialValues: PaceCalculatorFormValues;
  updateSplits: (splits: FormattedSplit[]) => any;
}

const validate = (values: PaceCalculatorFormValues) => {
  const errors: Partial<PaceCalculatorFormValues> = {};
  if (!values.distance) {
    errors.distance = "Please enter a distance";
  }

  return errors;
};

const PaceCalculatorForm: FunctionalComponent<PaceCalculatorFormProps> = ({
  initialValues,
  updateSplits
}) => {
  const [isUnitDisabled, setUnitDisabled] = useState(true);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values: PaceCalculatorFormValues) => {
      try {
        const calculatedSplits = getSplits(
          values.distance,
          values.unit,
          values.time
        );
        updateSplits(calculatedSplits);
        saveState(values.distance, values.unit, values.time);
      } catch (error) {
        // TODO: show this to user
        console.log(error.message);
      }
    }
  });
  useEffect(() => {
    // Unit input is not required if the user selects a known/configured race distance
    const matchingRace = raceOptions.find(
      race => race.name === formik.values.distance
    );
    setUnitDisabled(!!matchingRace);
  }, [raceOptions, formik.values.distance, setUnitDisabled]);

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
            placeholder="Enter Distance"
            list="distance-options"
            listOptions={raceOptions.map(({ name }) => name)}
          />
          <RadioButtonGroup
            name="unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
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
          placeholder="Enter Time"
        />
      </div>
      <div>
        <ActionButton type="submit" text="Calculate" />
      </div>
    </form>
  );
};

export default PaceCalculatorForm;
