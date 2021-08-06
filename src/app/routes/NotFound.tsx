import { FunctionalComponent, h } from 'preact';
import { Link, RouteComponentProps } from '@reach/router';

const Notfound: FunctionalComponent<RouteComponentProps> = () => {
  return (
    <>
      <h1>Error 404</h1>
      <p>That page doesn&apos;t exist.</p>
      <Link to="/">
        <h4>Back to Home</h4>
      </Link>
    </>
  );
};

export default Notfound;
