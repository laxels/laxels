import React, { PureComponent } from 'react';
import { randInt, withTouchHover } from './Utils';
import './MainLinks.css';
// import ResizeText from './components/ResizeText';

// This class contains the logic for every animated link on the home page.
// Each animated link is also a page header. It retains its animations in either mode.
// TODO: Extract and isolate code for each unique animation
class MainLinks extends PureComponent {
  constructor(props) {
    super(props);

    // For the Projects Page animation
    this.bgRef = React.createRef();

    // For the Contact Page animation
    const getRandomPos = () => ({ topPercent: randInt(101), leftPercent: randInt(101) });
    const dots = [...Array(10).keys()].map(getRandomPos);
    this.state = { radarPulses: [], dots };
    this._flashingDots = {};
  }

  componentDidMount() {
    // HAX: Since some of the animations rely on re-renders,
    // trigger re-renders periodically even when nothing is happening.
    setInterval(() => this.forceUpdate(), 200);
  }

  // This is called for each page ('projects', 'about', 'contact')
  generateMainLink = (page) => {
    const {
      activePage,
      lastActivePage,
      transitionDelayFn,
      handleClick,
      handleTouchStart,
      handleTouchEnd,
      unhovered,
    } = this.props;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <div
        key={page}
        className={`main-link main-link-animation ${page}-link ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''} ${unhovered === `main-${page}` ? 'unhover' : ''}`}
        onClick={handleClick(page)}
        onTouchStart={handleTouchStart(`main-${page}`)}
        onTouchEnd={handleTouchEnd(`main-${page}`)}
        style={transitionDelayFn(page)}
      >
        {/* <ResizeText>{page}</ResizeText> */}
        <span>{page}</span>
        {this[`${page}Animation`]()}
      </div>
    );
  };


  /*
   * PROJECTS PAGE
   */

  moveBlocks = () => {
    const { moving, stopMoving } = this.state;
    if (moving || stopMoving) return;
    this.setState({ moving: true }, () => {
      setTimeout(() => {
        this.setState({ moving: false }, () => {
          setTimeout(this.moveBlocks);
        });
      }, 1500);
    });
  };

  startBlockMovement = () => {
    this.setState({ stopMoving: false }, this.moveBlocks);
  };

  stopBlockMovement = () => {
    this.setState({ stopMoving: true });
  };

  projectsMouseEnter = () => {
    if (!this._disableMouseEnter) this.startBlockMovement();
    else delete this._disableMouseEnter;
  };

  projectsMouseLeave = () => {
    this.stopBlockMovement();
  };

  projectsTouchStart = () => {
    this.startBlockMovement();
  };

  projectsTouchEnd = () => {
    this.stopBlockMovement();
    this._disableMouseEnter = true;
  };

  projectsAnimation = () => {
    const bgWrap = this.bgRef.current;
    if (!bgWrap) return <div className="bg-wrap" ref={this.bgRef} />;

    const { moving } = this.state;
    const { height } = bgWrap.getBoundingClientRect();
    const generateSq = (i) => <div key={i} className={`shifting-sq ${moving ? 'moving' : ''}`} />;

    return (
      <div
        className={`bg-wrap ${moving ? 'moving' : ''}`}
        ref={this.bgRef}
        onMouseEnter={this.projectsMouseEnter}
        onMouseLeave={this.projectsMouseLeave}
        onTouchStart={this.projectsTouchStart}
        onTouchEnd={this.projectsTouchEnd}
      >
        <div className="left-bg" style={{ width: height / 2 }}>
          {[...Array(12).keys()].map(generateSq)}
        </div>
        <div className="right-bg" style={{ width: height / 2 }}>
          {[...Array(12).keys()].map(generateSq)}
        </div>
      </div>
    );
  };


  /*
   * ABOUT PAGE
   */

  aboutAnimation = () => {
    const maxMargin = Math.round(window.innerWidth / 5);
    const randomMargins = () => ({
      marginLeft: `${randInt(maxMargin + 1)}px`,
      marginRight: `${randInt(maxMargin + 1)}px`,
    });
    const generateBar = (i) => <div key={i} className="bar" style={randomMargins()} />;
    return (
      <div className="bars">
        {[...Array(5).keys()].map(generateBar)}
      </div>
    );
  };


  /*
   * CONTACT PAGE
   */

  contactMouseMove = (e) => {
    const { lastMouseMove, dots } = this.state;
    const now = Date.now();
    if (lastMouseMove && now - lastMouseMove < 500) return;

    const gridPos = e.currentTarget.getBoundingClientRect();
    let x, y;
    if (e.targetTouches) {
      x = e.targetTouches[0].clientX - gridPos.x;
      y = e.targetTouches[0].clientY - gridPos.y;
    } else {
      x = e.clientX - gridPos.x;
      y = e.clientY - gridPos.y;
    }
    const newPulse = { x, y, key: Math.random() };

    this.setState((prevState) => {
      const newRadarPulses = [...prevState.radarPulses];
      newRadarPulses.push(newPulse);
      return { lastMouseMove: now, radarPulses: newRadarPulses };
    }, () => {
      setTimeout(() => {
        this.setState((prevState) => {
          const newRadarPulses = [...prevState.radarPulses];
          newPulse.fading = true;
          return { radarPulses: newRadarPulses };
        });
      });
    });

    setTimeout(() => {
      this.setState((prevState) => {
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
      const dx = Math.round((gridPos.width * d.leftPercent) / 100);
      const dy = Math.round((gridPos.height * d.topPercent) / 100);
      const dist = Math.sqrt((dx - x) ** 2 + (dy - y) ** 2);
      if (dist <= 100) {
        const timeToFlash = dist * 10;
        setTimeout(() => {
          if (this._flashingDots[i]) return;
          this._flashingDots[i] = true;
          this.setState((prevState) => {
            const newDots = [...prevState.dots];
            d.found = true;
            return { dots: newDots };
          }, () => {
            setTimeout(() => {
              this.setState((prevState) => {
                const newDots = [...prevState.dots];
                delete d.found;
                return { dots: newDots };
              }, () => delete this._flashingDots[i]);
            }, 1000);
          });
        }, timeToFlash);
      }
    });
  };

  generateDot = ({ leftPercent, topPercent, found }, i) => (
    <div
      key={i}
      className={`dot ${found ? 'found' : ''}`}
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
    />
  );

  generatePulse = ({ x, y, key, fading }) => (
    <div
      key={key}
      className={`radar-pulse ${fading ? 'fading' : ''}`}
      style={{ left: `${x}px`, top: `${y}px` }}
    />
  );

  contactAnimation = () => {
    const { radarPulses, dots } = this.state;
    return (
      <div
        className="radar-grid"
        onMouseMove={this.contactMouseMove}
        onTouchStart={this.contactMouseMove}
        onTouchMove={this.contactMouseMove}
      >
        {radarPulses.map(this.generatePulse)}
        {dots.map(this.generateDot)}
      </div>
    );
  };


  render() {
    const {
      pages,
      activePage,
      lastActivePage,
      transitionDelayFn,
    } = this.props;
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
