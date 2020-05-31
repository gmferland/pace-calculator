import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import PaceCalculatorForm from '../../components/paceCalculatorForm';
import SplitsTable from '../../components/splitsTable';
import { loadSavedState } from '../../utilities/storage';
import { setMetaTags } from '../../utilities/url';
import { getSplits } from '../../../common/calculation';
import * as style from './style.css';

const Home: FunctionalComponent = () => {
  const savedState = loadSavedState();
  const initialFormValues = savedState || { distance: '', unit: '', time: '' };
  const initialSplits = savedState
    ? getSplits(savedState.distance, savedState.unit, savedState.time)
    : [];
  const [splits, updateSplits] = useState(initialSplits);

  useEffect(() => {
    // Set meta tags to reflect any stored state on page load
    setMetaTags();
  });

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
