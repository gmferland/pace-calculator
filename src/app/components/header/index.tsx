import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import HamburgerMenu from './HamburgerMenu';
import * as style from './style.css';
import * as global from 'app/style/global.css';

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <div class={`${global.container} ${style.headerContainer}`}>
        <nav class={style.nav}>
          <h1 class={style.title}>Race Pace</h1>
          <div class={`${style.links} ${global.mobileHidden}`}>
            <Link activeClassName={style.active} href="/">
              Pace Calculator
            </Link>
            <Link activeClassName={style.active} href="/race-predictor">
              Race Predictor
            </Link>
          </div>
          <div class={global.mobileOnly}>
            <HamburgerMenu></HamburgerMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
