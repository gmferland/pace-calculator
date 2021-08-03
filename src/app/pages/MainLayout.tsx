import { FunctionalComponent, h } from 'preact';
import { RouteComponentProps } from '@reach/router';
import Header from 'app/components/header';
import { routes } from 'common/config';
import style from './style.css';

const MainLayout: FunctionalComponent<RouteComponentProps> = ({ children }) => (
  <main class={style.container}>
    <Header routes={routes} />
    <div class={style.pageContainer}>{children}</div>
  </main>
);

export default MainLayout;
