import React, { PureComponent } from 'react';
import smoothScroll from 'smoothscroll';
import profile from './profile.jpg';
import fbIcon from './fb-icon.svg';
import liIcon from './li-icon.svg';
import './App.css';

const Wrap = ({children}) => children;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pages = [
    'Projects',
    'About',
    'Contact'
  ]

  pageColors = {
    Projects: 'green',
    About: 'yellow',
    Contact: 'red'
  }

  mainLink = (page) => {
    const {activePage, lastActivePage} = this.state;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <div
        key={page}
        className={`main-link main-link-animation ${this.pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''}`}
        onClick={() => this.activatePage(page)}
        style={this.transitionDelay(page)}
      >
        <span>{page}</span>
      </div>
    );
  }

  navLink = (page) => {
    const active = this.state.activePage === page;
    const inactive = !active && !!this.state.activePage;
    return (
      <div
        key={page}
        className={`nav-link nav-link-animation ${this.pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''}`}
        onClick={() => this.activatePage(page)}
      >
        <span>{page}</span>
      </div>
    );
  }

  page = (page) => {
    const {activePage} = this.state;
    let content;
    switch (page) {
      case 'Projects':
        content = (<Wrap>
          <h2>Gaudy Stuff</h2>
          <p>Work in progress</p>
          <h2>Websites</h2>
          <p>Work in progress</p>
          <h2>Plugins</h2>
          <p>Work in progress</p>
        </Wrap>);
        break;
      case 'About':
        content = (<Wrap>
          <p>
            Hi there! I'm a full-stack web developer who loves making apps as fun and pretty as I am. :P
          </p>

          <h2>Career Timeline</h2>
          <p>Work in progress</p>

          <h2>Experience</h2>
          <p>Front-end frameworks: React, Angular, Backbone</p>
          <p>Back-end frameworks: Node.js, Django</p>
          <p>Databases: PostgreSQL, MySQL, MongoDB</p>
          <p>Services: AWS, Heroku, etc.</p>
          <p>Misc: Redis, ElasticSearch, etc.</p>
          <p>Languages: JavaScript, Python, Java, Haskell</p>

          <h2>Education</h2>
          <p>Computer Science (Turing Scholar) @ University of Texas at Austin (2010-2012)</p>

          <h2>Social Media</h2>
          <p>
            <a href="https://www.facebook.com/laxels" target="_blank" rel="noopener noreferrer" className="social-media facebook">
              <img src={fbIcon} alt="Facebook"/>
            </a>
            <a href="https://www.linkedin.com/in/axelsetyanto" target="_blank" rel="noopener noreferrer" className="social-media linkedin">
              <img src={liIcon} alt="LinkedIn"/>
            </a>
          </p>
        </Wrap>);
        break;
      case 'Contact':
        content = (<Wrap>
          <h2>Hit me up!</h2>
          <p>
            <a href="mailto:laxels@gmail.com">laxels@gmail.com</a>
            <br/>
            Preferred method of contact
          </p>
          <p>
            <a href="tel:+17132932448">(713)-293-2448</a>
            <br/>
            May not be consistently available
          </p>
        </Wrap>);
        break;
      default:
    }
    return (
      <div
        key={page}
        className={`page ${page}-page ${activePage === page ? 'active' : ''}`}
        style={this.transitionDelay('page', page)}
      >
        {content}
      </div>
    );
  }

  activatePage = (page) => {
    this.setState(prevState => ({activePage: page, lastActivePage: prevState.activePage}));
    smoothScroll(0);
  }
  deactivatePages = () => {
    this.setState(prevState => ({activePage: undefined, lastActivePage: prevState.activePage}));
    smoothScroll(0);
  }

  transitionDelay = (el, page) => {
    let {activePage, lastActivePage} = this.state;
    let deactivating, switching;
    if (!activePage) {
      deactivating = true;
      activePage = lastActivePage;
    }
    else if (activePage && lastActivePage) {
      switching = true;
    }

    const step = .2;
    const duration = .8;

    const activePageIndex = this.pages.indexOf(activePage);
    const lastPageIndex = this.pages.length - 1;
    const maxDistanceFromActive = Math.max(activePageIndex+1, lastPageIndex-activePageIndex);
    const distanceFromActive = Math.abs(activePageIndex - this.pages.indexOf(el));

    const transformDelay = (maxDistanceFromActive - distanceFromActive) * step;
    const flippedTransformDelay = (distanceFromActive-1) * step;
    const heightDelay = (maxDistanceFromActive-1) * step + duration;

    if (!deactivating && !switching) {
      if (el === 'main-links-container') return {transitionDelay: `${heightDelay}s`};
      if (el === 'page' || el === 'nav') return {transitionDelay: `${heightDelay+duration}s`};
      return {transitionDelay: `${transformDelay}s, ${heightDelay}s, ${heightDelay}s`};
    }
    else if (switching) {
      if (el === 'main-links-container' || el === 'nav') return {};
      if (el === 'page') {
        if (page === activePage) return {transitionDelay: `${duration}s, ${duration}s, ${duration}s`};
        else return {transitionDelay: `0s, ${duration}s, ${duration}s`}
      }
      if (el === activePage) {
        return {transitionDelay: `${duration}s, ${duration}s, ${duration}s`};
      }
      else {
        return {transitionDelay: `0s, ${duration}s, ${duration}s`};
      }
    }
    else {
      if (el === 'main-links-container') return {transitionDelay: `${duration}s`};
      if (el === 'page') return {transitionDelay: `0s, ${duration}s, ${duration}s`};
      if (el === 'nav') return {transitionDelay: `0s, ${duration}s`};
      return {transitionDelay: `${flippedTransformDelay+1.6}s, ${duration}s, ${duration}s`};
    }
  }

  render() {
    const {activePage} = this.state;
    return (
      <div className="page-container">

        <header
          className={`page-header main-link-animation ${!!activePage ? 'inactive' : ''}`}
          style={this.transitionDelay('header')}
        >
          <a className="profile" href="//www.facebook.com/laxels" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Profile"/>
          </a>
        </header>

        <nav
          className={`main-links ${!!activePage ? 'page-active' : ''}`}
          style={this.transitionDelay('main-links-container')}
        >
          {this.pages.map(this.mainLink)}
        </nav>

        {this.pages.map(this.page)}

        <nav
          className={`nav-links ${!!activePage ? '' : 'hidden'}`}
          style={this.transitionDelay('nav')}
        >
          <div
            className={`nav-link nav-link-animation blue`}
            onClick={this.deactivatePages}
          >
            <span>Home</span>
          </div>
          {this.pages.map(this.navLink)}
        </nav>

      </div>
    );
  }
}

export default App;
