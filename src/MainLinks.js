import React, { PureComponent } from 'react';
import './MainLinks.css';

class MainLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(() => this.setState({x: Math.random()}), 200);
  }

  handleClick = (page) => {
    return e => {
      const {activePage, history} = this.props;
      if (activePage !== page) history.push(`/${page}`);
    }
  }

  handleTouchStart = (page) => {
    return e => {
      this.setState(prevState => {
        const newState = {lastTouch: {[page]: Date.now()}};
        if (prevState.unhovered === page) newState.unhovered = undefined;
        return newState;
      });
    }
  }

  handleTouchEnd = (page) => {
    return e => {
      const lastTouch = this.state.lastTouch[page];
      const now = Date.now();
      if (lastTouch && now - lastTouch < 1000) {
        setTimeout(() => {
          this.setState({unhovered: page});
        }, 1000 - (now - lastTouch));
      }
      else this.setState({unhovered: page});
    }
  }

  generateMainLink = (page) => {
    const {activePage, lastActivePage, pageColors, transitionDelayFn} = this.props;
    const {unhovered} = this.state;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <div
        key={page}
        className={`main-link main-link-animation ${page}-link ${pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''} ${unhovered === page ? 'unhover' : ''}`}
        onClick={this.handleClick(page)}
        onTouchStart={this.handleTouchStart(page)}
        onTouchEnd={this.handleTouchEnd(page)}
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
