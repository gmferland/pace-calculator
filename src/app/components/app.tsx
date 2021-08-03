import { FunctionalComponent, h } from 'preact';
import { Router } from '@reach/router';

import PaceCalculatorPage from 'app/pages/PaceCalculator';
import RacePredictorPage from 'app/pages/RacePredictor';
import NotFoundPage from 'app/pages/NotFound';
import MainLayout from 'app/pages/MainLayout';

// eslint-disable-next-line
if ((module as any).hot) {
  // eslint-disable-next-line
  require('preact/debug');
}

const App: FunctionalComponent = () => {
  return (
    <Router>
      <MainLayout path="/">
        <PaceCalculatorPage path="/" />
        <RacePredictorPage path="/race-predictor" />
        <NotFoundPage default />
      </MainLayout>
    </Router>
  );
};

export default App;
