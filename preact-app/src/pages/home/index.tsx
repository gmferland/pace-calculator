import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import PaceCalculatorForm, {
  PaceCalculatorFormValues
} from "../../components/paceCalculatorForm";
import SplitsTable from "../../components/splitsTable";
import { loadSavedState } from "../../utilities/storage";
import { getSplits } from "../../../common/calculation";
import * as style from "./style.css";

const Home: FunctionalComponent = () => {
  const savedState = loadSavedState();
  const initialFormValues = savedState || { distance: "", unit: "", time: "" };
  const initialSplits = savedState
    ? getSplits(
        initialFormValues.distance,
        initialFormValues.unit,
        initialFormValues.time
      )
    : [];
  const [splits, updateSplits] = useState(initialSplits);
  const onSubmit = (values: PaceCalculatorFormValues) => {
    // TODO: form validation
    try {
      const calculatedSplits = getSplits(
        values.distance,
        values.unit,
        values.time
      );
      updateSplits(calculatedSplits);
      // TODO: save values
    } catch (error) {
      // TODO: show this to user
      console.log(error.message);
    }
  };

  return (
    <div class={style.home}>
      <PaceCalculatorForm
        initialValues={initialFormValues}
        onSubmit={onSubmit}
      />
      <SplitsTable splits={splits} />
    </div>
  );
};

export default Home;
