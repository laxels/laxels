import React, { PureComponent } from 'react';
import './NavLinks.css';

class NavLinks extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
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

  generateNavLink = (page) => {
    const {pageColors} = this.props;
    const {unhovered} = this.state;
    return (
      <div
        key={page}
        className={`nav-link nav-link-animation ${pageColors[page]} ${unhovered === page ? 'unhover' : ''}`}
        onClick={this.handleClick(page)}
        onTouchStart={this.handleTouchStart(page)}
        onTouchEnd={this.handleTouchEnd(page)}
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
    const {pages, activePage, transitionDelayFn} = this.props;
    const {unhovered} = this.state;
    return (
      <nav
        className={`nav-links ${activePage ? '' : 'hidden'}`}
        style={transitionDelayFn('nav')}
      >
        <div
          className={`nav-link nav-link-animation blue ${unhovered === 'home' ? 'unhover' : ''}`}
          onClick={this.handleClick('')}
          onTouchStart={this.handleTouchStart('home')}
          onTouchEnd={this.handleTouchEnd('home')}
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

export default NavLinks;
