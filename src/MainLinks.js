import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './MainLinks.css';

class MainLinks extends PureComponent {
  generateMainLink = (page) => {
    const {activePage, lastActivePage, pageColors, transitionDelayFn} = this.props;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <Link
        key={page}
        className={`main-link main-link-animation ${pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''}`}
        to={`/${page}`}
        style={transitionDelayFn(page)}
      >
        <span>{page}</span>
      </Link>
    );
  }

  render() {
    const {pages, activePage, lastActivePage, transitionDelayFn} = this.props;
    const switching = activePage && lastActivePage;
    return (
      <nav
        className={`main-links ${activePage ? 'page-active' : ''} ${switching ? 'switching' : ''}`}
        style={transitionDelayFn('main-links-container')}
      >
        {pages.map(this.generateMainLink)}
      </nav>
    );
  }
}

export default MainLinks;
