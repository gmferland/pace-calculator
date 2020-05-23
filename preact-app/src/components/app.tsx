import { FunctionalComponent, h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import Home from "../pages/home";
import NotFoundPage from "../pages/notfound";
import Header from "./header";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require("preact/debug");
}

const App: FunctionalComponent = () => {
  let currentUrl: string;
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url;
  };

  return (
    <div>
      <Header />
      <div class="container">
        <Router onChange={handleRoute}>
          <Route path="/" component={Home} />
          <NotFoundPage default />
        </Router>
      </div>
    </div>
  );
};

export default App;
