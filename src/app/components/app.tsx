import { FunctionalComponent, h, Fragment } from 'preact';
import { Route, Router, RouterOnChangeArgs } from 'preact-router';

import Home from '../pages/home';
import NotFoundPage from '../pages/notfound';
import Header from './header';
import { setUrlMetaTags } from '../utilities/url';

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
      <main class="container">
        <Router onChange={handleRoute}>
          <Route path="/" component={Home} />
          <NotFoundPage default />
        </Router>
      </main>
    </Fragment>
  );
};

export default App;
