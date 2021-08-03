import { FunctionalComponent, h } from 'preact';
import { Link, LinkGetProps, LinkProps } from '@reach/router';
import classNames from 'classnames/bind';
import * as style from './style.css';

const cx = classNames.bind(style);

interface NavLinkProps extends LinkProps<unknown> {
  isPartiallyActive?: boolean;
}

const NavLink: FunctionalComponent<NavLinkProps> = props => {
  const getActiveProps = ({ isCurrent, isPartiallyCurrent }: LinkGetProps) => ({
    className: cx(style.navLink, {
      [style.active]:
        isCurrent || (props.isPartiallyActive && isPartiallyCurrent),
    }),
  });
  return <Link getProps={getActiveProps} {...props} />;
};

export default NavLink;
