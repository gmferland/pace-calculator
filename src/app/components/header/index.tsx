import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { RouteConfig } from 'common/config';
import HamburgerMenuButton from './HamburgerMenuButton';
import * as style from './style.css';
import * as global from 'app/style/global.css';

interface HeaderProps {
  routes: RouteConfig[];
  pageTitle: string;
}

const Header: FunctionalComponent<HeaderProps> = ({ routes, pageTitle }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOverlayShowing, setOverlayShowing] = useState(false);
  const toggleMenu = () => {
    if (isMenuOpen) {
      setOverlayShowing(false);
    }
    setMenuOpen(!isMenuOpen);
  };
  const toggleOverlay = () => setOverlayShowing(isMenuOpen);

  return (
    <header class={style.header}>
      <div class={`${global.container} ${style.headerContainer}`}>
        <nav class={style.nav}>
          <h1 class={`${style.title} ${global.mobileOnly}`}>{pageTitle}</h1>
          {/* On desktop, the various page titles are always visible */}
          <h1 class={`${style.title} ${global.mobileHidden}`}>Race Pace</h1>
          <ul class={`${style.links} ${global.mobileHidden}`}>
            {routes.map(routeConfig => (
              <li key={routeConfig.route}>
                <Link activeClassName={style.active} href={routeConfig.route}>
                  {routeConfig.label}
                </Link>
              </li>
            ))}
          </ul>
          <div class={global.mobileOnly}>
            <HamburgerMenuButton onClick={toggleMenu}></HamburgerMenuButton>
            <div
              class={`${style.offScreenContainer} ${
                isMenuOpen ? style.open : ''
              } ${isOverlayShowing ? style.overlay : ''}`}
              onClick={toggleMenu}
              onTransitionEnd={toggleOverlay}
            >
              <ul class={style.links} onClick={e => e.stopPropagation()}>
                {routes.map(routeConfig => (
                  <li key={routeConfig.route}>
                    <Link
                      activeClassName={style.active}
                      href={routeConfig.route}
                    >
                      {routeConfig.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
