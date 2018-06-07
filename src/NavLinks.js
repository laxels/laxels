import React, { PureComponent } from 'react';
import { withTouchHover } from './Utils';
import './NavLinks.css';

class NavLinks extends PureComponent {
  generateNavLink = (page) => {
    const {pageColors, handleClick, handleTouchStart, handleTouchEnd, unhovered} = this.props;
    return (
      <div
        key={page}
        className={`nav-link nav-link-animation ${pageColors[page]} ${unhovered === `nav-${page}` ? 'unhover' : ''}`}
        onClick={handleClick(page)}
        onTouchStart={handleTouchStart(`nav-${page}`)}
        onTouchEnd={handleTouchEnd(`nav-${page}`)}
      >
        <span>{page}</span>
        <div className="drape-wrap">
          <div className="drape">
            <span>{page}</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {pages, activePage, transitionDelayFn, handleClick, handleTouchStart, handleTouchEnd, unhovered} = this.props;
    return (
      <nav
        className={`nav-links ${activePage ? '' : 'hidden'}`}
        style={transitionDelayFn('nav')}
      >
        <div
          className={`nav-link nav-link-animation blue ${unhovered === 'nav-home' ? 'unhover' : ''}`}
          onClick={handleClick('')}
          onTouchStart={handleTouchStart('nav-home')}
          onTouchEnd={handleTouchEnd('nav-home')}
        >
          <span>Home</span>
          <div className="drape-wrap">
            <div className="drape">
              <span>Home</span>
            </div>
          </div>
        </div>
        {pages.map(this.generateNavLink)}
      </nav>
    );
  }
}

export default withTouchHover(NavLinks);
