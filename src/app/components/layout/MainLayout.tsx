import { FunctionalComponent, h } from 'preact';
import { RouteComponentProps } from '@reach/router';
import Header from 'app/components/header';
import { routes } from 'common/config';
import style from './style.css';
import global from '../styles/global.css';

const MainLayout: FunctionalComponent<RouteComponentProps> = ({ children }) => (
  <>
    <Header routes={routes} />
    <main class={global.container}>
      <div class={style['page-container']}>
        {children}
      </div>
    </main>
  </>
);

export default MainLayout;
