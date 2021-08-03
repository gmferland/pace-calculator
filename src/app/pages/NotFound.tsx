import { FunctionalComponent, h } from 'preact';
import { Link, RouteComponentProps } from '@reach/router';
import * as style from './style.css';

const Notfound: FunctionalComponent<RouteComponentProps> = () => {
  return (
    <div class={style.pageContainer}>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link to="/">
        <h4>Back to Home</h4>
      </Link>
    </div>
  );
};

export default Notfound;
