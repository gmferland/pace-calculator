import { Fragment, FunctionalComponent, h } from 'preact';
import * as style from './style.css';

const HamburgerMenu: FunctionalComponent = () => {
  return (
    <Fragment>
      <button type="button" class={style.hamburgerMenuButton}>
        <span class={style.menuLine}></span>
        <span class={style.menuLine}></span>
        <span class={style.menuLine}></span>
      </button>
    </Fragment>
  );
};

export default HamburgerMenu;
