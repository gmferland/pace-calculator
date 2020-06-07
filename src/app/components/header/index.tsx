import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import * as style from './style.css';
import * as global from 'app/style/global.css';

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <div class={global.container}>
        <nav class={style.nav}>
          <Link href="/">
            <h1 class={style.title}>Pace Calculator</h1>
          </Link>
          <div class={style.links}>
            <Link activeClassName={style.active} href="/race-predictor">
              Race Predictor
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
