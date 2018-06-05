import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './MainLinks.css';

class MainLinks extends PureComponent {
  componentDidMount() {
    setInterval(() => this.setState({x: Math.random()}), 200);
  }

  generateMainLink = (page) => {
    const {activePage, lastActivePage, pageColors, transitionDelayFn} = this.props;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <Link
        key={page}
        className={`main-link main-link-animation ${page}-link ${pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''}`}
        to={`/${page}`}
        style={transitionDelayFn(page)}
      >
        <span>{page}</span>
        {this[`${page}Animation`]()}
      </Link>
    );
  }

  projectsAnimation = () => null;

  aboutAnimation = () => {
    const maxMargin = Math.round(window.innerWidth / 5);
    const getRandomInt = () => Math.floor(Math.random() * maxMargin);
    const randomMargins = () => ({marginLeft: `${getRandomInt()}px`, marginRight: `${getRandomInt()}px`});
    const generateBar = (i) => <div key={i} className="bar" style={randomMargins()}/>;
    return (
      <div className="bars">
        {[...Array(5).keys()].map(generateBar)}
      </div>
    );
  }

  contactAnimation = () => null;

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
