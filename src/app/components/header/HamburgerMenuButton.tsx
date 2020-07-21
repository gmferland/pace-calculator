import { FunctionalComponent, h } from 'preact';
import * as style from './style.css';

interface HamburgerMenuButtonProps {
  onClick: () => any;
}

const HamburgerMenuButton: FunctionalComponent<HamburgerMenuButtonProps> = ({
  onClick,
}) => {
  return (
    <button type="button" class={style.hamburgerMenuButton} onClick={onClick}>
      <span class={style.menuLine}></span>
      <span class={style.menuLine}></span>
      <span class={style.menuLine}></span>
    </button>
  );
};

export default HamburgerMenuButton;
