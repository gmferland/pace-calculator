import { FunctionalComponent, h } from 'preact';
import style from './style.css';

interface HamburgerMenuButtonProps {
  onClick: () => any;
}

const HamburgerMenuButton: FunctionalComponent<HamburgerMenuButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      class={style['hamburger-menu-button']}
      onClick={onClick}
    >
      <span class={style['menu-line']}></span>
      <span class={style['menu-line']}></span>
      <span class={style['menu-line']}></span>
    </button>
  );
};

export default HamburgerMenuButton;
