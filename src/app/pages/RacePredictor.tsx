import { FunctionalComponent, h } from 'preact';
import RacePredictorForm from 'app/components/forms/RacePredictorForm';
import { useState } from 'preact/hooks';
import * as style from './style.css';
import RaceTimeDisplay from 'app/components/widgets/RaceTimeDisplay';

const RacePredictor: FunctionalComponent = () => {
  const [finishInfo, setFinishInfo] = useState({ race: '', time: '' });
  return (
    <div class={style.pageContainer}>
      <RacePredictorForm updateFinishInfo={setFinishInfo} />
      <RaceTimeDisplay title="Predicted Finish" {...finishInfo} />
    </div>
  );
};

export default RacePredictor;
