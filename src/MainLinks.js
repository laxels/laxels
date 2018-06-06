import React, { PureComponent } from 'react';
import { withTouchHover } from './Utils';
import './MainLinks.css';

class MainLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(() => this.setState({x: Math.random()}), 200);
  }

  generateMainLink = (page) => {
    const {activePage, lastActivePage, pageColors, transitionDelayFn, handleClick, handleTouchStart, handleTouchEnd, unhovered} = this.props;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <div
        key={page}
        className={`main-link main-link-animation ${page}-link ${pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''} ${unhovered === `main-${page}` ? 'unhover' : ''}`}
        onClick={handleClick(page)}
        onTouchStart={handleTouchStart(`main-${page}`)}
        onTouchEnd={handleTouchEnd(`main-${page}`)}
        style={transitionDelayFn(page)}
      >
        <span>{page}</span>
        {this[`${page}Animation`]()}
      </div>
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

  getRandomInt = () => Math.floor(Math.random() * 101);
  randomPos = () => ({top: `${this.getRandomInt()}%`, left: `${this.getRandomInt()}%`});
  generateDot = (i) => <div key={i} className="dot" style={this.randomPos()}/>;
  dots = [...Array(5).keys()].map(this.generateDot);
  contactAnimation = () => {
    return (
      <div className="radar-grid">
        {this.dots}
      </div>
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

export default withTouchHover(MainLinks);
