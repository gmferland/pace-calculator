import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import PaceCalculatorForm from '../components/forms/PaceCalculatorForm';
import SplitsTable from '../components/widgets/SplitsTable';
import { loadSavedState } from '../utilities/storage';
import { setImageMetaTags } from '../utilities/url';
import { getSplits } from 'common/calculation';
import * as style from './style.css';
import {
  getCanonicalNameForUnit,
  parseDistanceInput,
} from 'app/utilities/form';

const PaceCalculator: FunctionalComponent = () => {
  const savedState = loadSavedState();
  const initialFormValues = { distance: '', time: '' };
  if (savedState) {
    const unitText = getCanonicalNameForUnit(savedState.unit);
    let displayDistance = `${savedState.distance} ${unitText}`;

    if (!savedState.unit) {
      // Backwards compatibility shim
      const { distance, unit, displayName } = parseDistanceInput(
        savedState.distance
      );
      displayDistance = displayName;
      savedState.distance = distance;
      savedState.unit = unit;
    }
    initialFormValues.distance = displayDistance;
    initialFormValues.time = savedState.time;
  }
  const initialSplits = savedState
    ? getSplits(savedState.distance, savedState.unit, savedState.time)
    : [];
  const [splits, updateSplits] = useState(initialSplits);

  useEffect(() => {
    // Set meta tags to reflect any stored state on page load
    setImageMetaTags();
  });

  return (
    <div class={style.pageContainer}>
      <PaceCalculatorForm
        initialValues={initialFormValues}
        updateSplits={updateSplits}
      />
      <SplitsTable splits={splits} />
    </div>
  );
};

export default PaceCalculator;
