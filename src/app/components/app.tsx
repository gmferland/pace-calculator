import { FunctionalComponent, h } from 'preact';
import { Router } from '@reach/router';

import PaceCalculatorPage from 'app/routes/PaceCalculator';
import RacePredictorPage from 'app/routes/RacePredictor';
import NotFoundPage from 'app/routes/NotFound';
import MainLayout from 'app/components/layout/MainLayout';

// eslint-disable-next-line
if ((module as any).hot) {
  // eslint-disable-next-line
  require('preact/debug');
}

const App: FunctionalComponent = () => {
  return (
    <div id="preact-root">
      <Router>
        <MainLayout path="/">
          <PaceCalculatorPage path="/" />
          <RacePredictorPage path="/race-predictor" />
          <NotFoundPage default />
        </MainLayout>
      </Router>
    </div>
  );
};

export default App;
