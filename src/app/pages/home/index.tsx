import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import PaceCalculatorForm from "../../components/paceCalculatorForm";
import SplitsTable from "../../components/splitsTable";
import { loadSavedState } from "../../utilities/storage";
import { getSplits } from "../../../common/calculation";
import * as style from "./style.css";

const Home: FunctionalComponent = () => {
  const savedState = loadSavedState();
  const initialFormValues = savedState || { distance: "", unit: "", time: "" };
  const initialSplits = savedState
    ? getSplits(savedState.distance, savedState.unit, savedState.time)
    : [];
  const [splits, updateSplits] = useState(initialSplits);

  return (
    <div class={style.home}>
      <PaceCalculatorForm
        initialValues={initialFormValues}
        updateSplits={updateSplits}
      />
      <SplitsTable splits={splits} />
    </div>
  );
};

export default Home;
