import { FunctionalComponent, h, Fragment } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import PaceCalculatorPage from '../pages/PaceCalculator';
import RacePredictorPage from '../pages/RacePredictor';
import NotFoundPage from '../pages/NotFound';
import Header from './header';
import { setUrlMetaTags } from '../utilities/url';

import * as global from 'app/style/global.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require('preact/debug');
}

const App: FunctionalComponent = () => {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
    setUrlMetaTags(currentUrl);
  };

  return (
    <Fragment>
      <Header />
      <main class={global.container}>
        <Router onChange={handleRoute}>
          <Route path="/" component={PaceCalculatorPage} />
          <Route path="/race-predictor" component={RacePredictorPage} />
          <NotFoundPage default />
        </Router>
      </main>
    </Fragment>
  );
};

export default App;
