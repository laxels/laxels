import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './NavLinks.css';

class NavLinks extends PureComponent {
  generateNavLink = (page) => {
    const {activePage, pageColors} = this.props;
    const active = activePage === page;
    const inactive = !active && activePage;
    return (
      <Link
        key={page}
        to={`/${page}`}
        className={`nav-link nav-link-animation ${pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''}`}
      >
        <span>{page}</span>
        <div className="drape-wrap">
          <div className="drape">
            <span>{page}</span>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const {pages, activePage, transitionDelayFn} = this.props;
    return (
      <nav
        className={`nav-links ${activePage ? '' : 'hidden'}`}
        style={transitionDelayFn('nav')}
      >
        <Link
          to="/"
          className={`nav-link nav-link-animation blue`}
        >
          <span>Home</span>
          <div className="drape-wrap">
            <div className="drape">
              <span>Home</span>
            </div>
          </div>
        </Link>
        {pages.map(this.generateNavLink)}
      </nav>
    );
  }
}

export default NavLinks;
