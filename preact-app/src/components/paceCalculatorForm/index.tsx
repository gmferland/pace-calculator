import { FunctionalComponent, h } from "preact";
import * as style from "./style.css";
import ActionButton from "../actionButton";
import GenericInput from "../genericInput";
import RadioButtonGroup from "../radioButtonGroup";

const raceOptions = ["1500", "5k", "10k"];
const unitOptions = [
  { label: "m", value: "1" },
  { label: "km", value: "2" },
  { label: "mi", value: "3" }
];

const PaceCalculatorForm: FunctionalComponent = () => {
  return (
    <form class={style.form}>
      <div class={style.inputRow}>
        <div class={style.distance}>
          <GenericInput
            type="text"
            name="distance"
            label="Distance"
            placeholder="Enter Distance"
            list="distance-options"
            listOptions={raceOptions}
          />
          <RadioButtonGroup name="unit" options={unitOptions} />
        </div>
        <GenericInput
          type="text"
          name="time"
          label="Goal Time"
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
