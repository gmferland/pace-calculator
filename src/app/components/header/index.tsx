import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { setUrlMetaTags } from 'app/utilities/url';
import { RouteConfig } from 'common/config';
import HamburgerMenuButton from './HamburgerMenuButton';
import style from './style.css';
import global from '../styles/global.css';
import NavLink from '../NavLink';

interface HeaderProps {
  routes: RouteConfig[];
}

const Header: FunctionalComponent<HeaderProps> = ({ routes }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOverlayShowing, setOverlayShowing] = useState(false);

  const location = useLocation();
  const activeRoute = routes.find(({ route }) => route === location.pathname);
  const pageTitle = activeRoute ? activeRoute.label : 'Race Pace';

  useEffect(() => {
    setUrlMetaTags(location.pathname);
  }, [location]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setOverlayShowing(false);
    }
    setMenuOpen(!isMenuOpen);
  };
  const toggleOverlay = () => setOverlayShowing(isMenuOpen);

  return (
    <header class={style.header}>
      <div class={classNames(global.container, style['header-container'])}>
        <nav class={style.nav}>
          <h1 class={classNames(style.title, global['mobile-only'])}>
            {pageTitle}
          </h1>
          {/* On desktop, the various page titles are always visible */}
          <h1 class={classNames(style.title, global['mobile-hidden'])}>
            Race Pace
          </h1>
          <ul class={classNames(style.links, global['mobile-hidden'])}>
            {routes.map(routeConfig => (
              <li key={routeConfig.route}>
                <NavLink to={routeConfig.route}>{routeConfig.label}</NavLink>
              </li>
            ))}
          </ul>
          <div class={global['mobile-only']}>
            <HamburgerMenuButton onClick={toggleMenu}></HamburgerMenuButton>
            <div
              class={classNames(style['off-screen-container'], {
                [style.open]: isMenuOpen,
                [style.overlay]: isOverlayShowing,
              })}
              onClick={toggleMenu}
              onTransitionEnd={toggleOverlay}
            >
              <ul class={style.links} onClick={e => e.stopPropagation()}>
                {routes.map(routeConfig => (
                  <li key={routeConfig.route}>
                    <NavLink to={routeConfig.route}>
                      {routeConfig.label}
                    </NavLink>
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
