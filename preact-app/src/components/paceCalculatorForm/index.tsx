import { FunctionalComponent, h } from "preact";
import { useFormik } from "formik";
import * as style from "./style.css";
import ActionButton from "../actionButton";
import GenericInput from "../genericInput";
import RadioButtonGroup from "../radioButtonGroup";
import { raceOptions, units } from "../../../common/config";

export interface PaceCalculatorFormValues {
  distance: string;
  unit: string;
  time: string;
}

interface PaceCalculatorFormProps {
  initialValues: PaceCalculatorFormValues;
  onSubmit: (values: PaceCalculatorFormValues) => any;
}

const PaceCalculatorForm: FunctionalComponent<PaceCalculatorFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  });
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
