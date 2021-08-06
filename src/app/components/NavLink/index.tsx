import { FunctionalComponent, h } from 'preact';
import { Link, LinkGetProps, LinkProps } from '@reach/router';
import classNames from 'classnames';
import style from './style.css';

interface NavLinkProps extends LinkProps<unknown> {
  isPartiallyActive?: boolean;
}

const NavLink: FunctionalComponent<NavLinkProps> = props => {
  const getActiveProps = ({ isCurrent, isPartiallyCurrent }: LinkGetProps) => ({
    className: classNames(style["nav-link"], {
      [style.active]:
        isCurrent || (props.isPartiallyActive && isPartiallyCurrent),
    }),
  });
  return <Link getProps={getActiveProps} {...props} />;
};

export default NavLink;
