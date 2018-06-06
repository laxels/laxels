import React, { PureComponent } from 'react';
import { withTouchHover } from './Utils';
import './MainLinks.css';

class MainLinks extends PureComponent {
  constructor(props) {
    super(props);

    const getRandomInt = () => Math.floor(Math.random() * 101);
    const getRandomPos = () => ({topPercent: getRandomInt(), leftPercent: getRandomInt()});
    const dots = [...Array(5).keys()].map(getRandomPos);
    this.state = {radarPulses: [], dots: dots};
    this._flashingDots = {};
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

  handleMouseMove = e => {
    const {lastMouseMove, dots} = this.state;
    const now = Date.now();
    if (lastMouseMove && now - lastMouseMove < 500) return;

    const gridPos = e.currentTarget.getBoundingClientRect();
    let x, y;
    if (e.targetTouches) {
      x = e.targetTouches[0].clientX - gridPos.x;
      y = e.targetTouches[0].clientY - gridPos.y;
    }
    else {
      x = e.clientX - gridPos.x;
      y = e.clientY - gridPos.y;
    }
    const newPulse = {x, y};

    this.setState(prevState => {
      const newRadarPulses = [...prevState.radarPulses];
      newRadarPulses.push(newPulse);
      return {lastMouseMove: now, radarPulses: newRadarPulses};
    }, () => {
      setTimeout(() => {
        this.setState(prevState => {
          const newRadarPulses = [...prevState.radarPulses];
          newPulse.fading = true;
          return {radarPulses: newRadarPulses};
        });
      });
    });

    setTimeout(() => {
      this.setState(prevState => {
        const newState = {};
        const newRadarPulses = [...prevState.radarPulses];
        const i = newRadarPulses.indexOf(newPulse);
        if (i > -1) {
          newRadarPulses.splice(i, 1);
          newState.radarPulses = newRadarPulses;
        }
        return newState;
      });
    }, 1000);

    dots.forEach((d, i) => {
      const dx = Math.round(gridPos.width * d.leftPercent/100);
      const dy = Math.round(gridPos.height * d.topPercent/100);
      const dist = Math.sqrt(Math.pow(dx-x,2) + Math.pow(dy-y,2));
      if (dist <= 100) {
        const timeToFlash = dist * 10;
        setTimeout(() => {
          if (this._flashingDots[i]) return;
          this._flashingDots[i] = true;
          this.setState(prevState => {
            const newDots = [...prevState.dots];
            d.found = true;
            return {dots: newDots};
          }, () => {
            setTimeout(() => {
              this.setState(prevState => {
                const newDots = [...prevState.dots];
                delete d.found;
                return {dots: newDots};
              }, () => delete this._flashingDots[i]);
            }, 1000);
          });
        }, timeToFlash);
      }
    });
  }
  generateDot = ({leftPercent, topPercent, found}, i) => (
    <div
      key={i}
      className={`dot ${found ? 'found' : ''}`}
      style={{left: `${leftPercent}%`, top: `${topPercent}%`}}
    />
  );
  generatePulse = ({x, y, fading}) => (
    <div
      key={`${x},${y}`}
      className={`radar-pulse ${fading ? 'fading' : ''}`}
      style={{left: `${x}px`, top: `${y}px`}}
    />
  )
  contactAnimation = () => {
    const {radarPulses, dots} = this.state;
    return (
      <div
        className="radar-grid"
        onMouseMove={this.handleMouseMove}
        onTouchStart={this.handleMouseMove}
        onTouchMove={this.handleMouseMove}
      >
        {radarPulses.map(this.generatePulse)}
        {dots.map(this.generateDot)}
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
