import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.css";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <div class="container">
        <nav class={style.nav}>
          <Link activeClassName={style.active} href="/">
            <h1>Pace Calculator</h1>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
