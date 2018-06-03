import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import smoothScroll from 'smoothscroll';
import Konami from 'konami';
import profile from './profile.jpg';
import fbIcon from './fb-icon.svg';
import liIcon from './li-icon.svg';
import utLogo from './ut-logo.png';
import lokuLogo from './loku-logo.webp';
import crowdmedLogo from './crowdmed-logo.png';
import pixelkeetLogo from './pixelkeet-logo.jpg';
import './App.css';


const PAGES = [
  'projects',
  'about',
  'contact'
];

const PAGE_COLORS = {
  projects: 'green',
  about: 'yellow',
  contact: 'red'
};

const Wrap = ({children}) => children;


class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    new Konami(() => {
      alert('Konami Code!');
    });
  }

  static getDerivedStateFromProps(props, state) {
    const url = props.location.pathname;
    const page = url.split('/')[1];
    if (page && PAGES.indexOf(page) === -1) {
      props.history.replace('/');
      return null;
    }
    if (url !== state.url) return {url: url, activePage: page, lastActivePage: state.activePage};
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activePage !== this.state.activePage) smoothScroll(0);
  }

  mainLink = (page) => {
    const {activePage, lastActivePage} = this.state;
    const active = activePage === page;
    const inactive = !active && activePage;
    const switching = activePage && lastActivePage;
    return (
      <Link
        key={page}
        className={`main-link main-link-animation ${PAGE_COLORS[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''} ${switching ? 'switching' : ''}`}
        to={`/${page}`}
        style={this.transitionDelay(page)}
      >
        <span>{page}</span>
      </Link>
    );
  }

  navLink = (page) => {
    const active = this.state.activePage === page;
    const inactive = !active && !!this.state.activePage;
    return (
      <Link
        key={page}
        to={`/${page}`}
        className={`nav-link nav-link-animation ${PAGE_COLORS[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''}`}
      >
        <span>{page}</span>
      </Link>
    );
  }

  page = (page) => {
    const {activePage} = this.state;
    let content;
    switch (page) {
      case 'projects':
        content = (<Wrap>
          <h2>Cool Stuff</h2>
          <p>Gaudy Transitions (Coming soon!)</p>
          <p><a href="https://bn-arena.herokuapp.com" target="_blank" rel="noopener noreferrer">Battle Network Arena</a></p>
          <p><a href="https://chrome.google.com/webstore/detail/haunted-by-poyo/jcdbalpjodfkfogbhhfpldijbnnmpbpc" target="_blank" rel="noopener noreferrer">Haunted By Poyo</a></p>

          <h2>Reinventing The Wheel</h2>
          <p>Just for additional practice.</p>
          <p><a href="https://github.com/laxels/password-strength" target="_blank" rel="noopener noreferrer">Password strength meter</a></p>
          <p><a href="https://github.com/laxels/select" target="_blank" rel="noopener noreferrer">Styled selects</a></p>
          <p><a href="https://github.com/laxels/overlay" target="_blank" rel="noopener noreferrer">Overlay</a></p>
          <p><a href="https://github.com/laxels/autocomplete" target="_blank" rel="noopener noreferrer">Autocomplete</a></p>
        </Wrap>);
        break;
      case 'about':
        content = (<Wrap>
          <p>
            Hi there! I'm a full-stack web developer who loves making apps as fun, pretty, and bug-free as I am. :P
          </p>

          <h2>Career Timeline</h2>
          <p>Hover or tap on the icons for details!</p>
          <div className="timeline">
            <div className="timeline-sec">
              <div className="sec-fill ut"/>
            </div>
            <div className="timeline-sec">
              <div className="sec-fill ut half"/>
              <div className="sec-fill loku half"/>
            </div>
            <div className="timeline-sec">
              <div className="sec-fill ut"/>
            </div>
            <div className="timeline-sec">
              <div className="sec-fill crowdmed"/>
            </div>
            <div className="timeline-sec">
              <div className="sec-fill pixelkeet"/>
            </div>
            <div className="timeline-labels">
              <div className="timeline-label top-label">
                <img src={utLogo} alt="University of Texas at Austin logo"/>
                <div className="text">
                  <span>BS Computer Science</span>
                  <span>@ UT Austin (2010-2012)</span>
                </div>
                <div className="tick ut"/>
              </div>
              <div className="timeline-label">
                <img src={lokuLogo} alt="Loku logo"/>
                <div className="text">
                  <span>Software Engineer</span>
                  <span>@ Loku (2011-2012)</span>
                </div>
                <div className="tick loku"/>
              </div>
              <div className="timeline-label">
                <img src={crowdmedLogo} alt="CrowdMed logo"/>
                <div className="text">
                  <span>Technical Co-Founder</span>
                  <span>& Lead Developer</span>
                  <span>@ CrowdMed (2012-2016)</span>
                </div>
                <div className="tick crowdmed"/>
              </div>
              <div className="timeline-label">
                <img src={pixelkeetLogo} alt="Pixelkeet logo"/>
                <div className="text">
                  <span>Freelance Developer</span>
                  <span>@ Pixelkeet (2016+)</span>
                </div>
                <div className="tick pixelkeet"/>
              </div>
            </div>
          </div>

          <h2>Experience</h2>
          <p>Front-end frameworks: React, Angular, Backbone</p>
          <p>Back-end frameworks: Node.js, Django</p>
          <p>Databases: PostgreSQL, MySQL, MongoDB</p>
          <p>Services: AWS, Heroku, etc.</p>
          <p>Misc: Redis, ElasticSearch, etc.</p>
          <p>Languages: JavaScript, Python, Java, Haskell</p>

          <h2>Education</h2>
          <p>Computer Science (Turing Scholar) @ University of Texas at Austin (2010-2012)</p>

          <h2>Other Stuff</h2>
          <p>
            My hobbies include:
            <br/>
            - Attending concerts/festivals
            <br/>
            - Karaoke/clubbing with friends
            <br/>
            - Video games/TV
            <br/>
            - Stuffing myself
            <br/>
            - Long walks with music
          </p>

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
      case 'contact':
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
        <div className="page-content">
          {content}
        </div>
      </div>
    );
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
    const duration = .6;

    const activePageIndex = PAGES.indexOf(activePage);
    const lastPageIndex = PAGES.length - 1;
    const maxDistanceFromActive = Math.max(activePageIndex+1, lastPageIndex-activePageIndex);
    const distanceFromActive = Math.abs(activePageIndex - PAGES.indexOf(el));

    const transformDelay = (maxDistanceFromActive - distanceFromActive) * step;
    const flippedTransformDelay = (distanceFromActive-1) * step;
    const heightDelay = (maxDistanceFromActive-1) * step + duration;

    if (!deactivating && !switching) {
      if (el === 'main-links-container') return {transitionDelay: `${heightDelay}s`};
      if (el === 'page' || el === 'nav') return {transitionDelay: `${heightDelay+duration}s`};
      return {transitionDelay: `${transformDelay}s, ${heightDelay}s, ${heightDelay}s, ${heightDelay+duration}s`};
    }
    else if (switching) {
      if (el === 'main-links-container' || el === 'nav') return {};
      if (el === 'page') {
        if (page === activePage) return {transitionDelay: `${duration}s, ${duration}s`};
        else return {transitionDelay: `0s, ${duration}s`}
      }
      if (el === activePage) {
        return {transitionDelay: `${duration}s, ${duration}s, ${duration}s, ${duration}s`};
      }
      else {
        return {transitionDelay: `0s, ${duration}s, ${duration}s, ${duration}s`};
      }
    }
    else {
      if (el === 'main-links-container') return {transitionDelay: `${duration}s`};
      if (el === 'page') return {transitionDelay: `0s, ${duration}s`};
      if (el === 'nav') return {transitionDelay: `0s, ${duration}s`};
      return {transitionDelay: `${flippedTransformDelay+2*duration}s, ${duration}s, ${duration}s, 0s`};
    }
  }

  render() {
    const {activePage} = this.state;
    return (
      <div className={`page-container ${activePage ? 'page-active' : ''}`}>

        <header
          className={`page-header main-link-animation ${activePage ? 'inactive' : ''}`}
          style={this.transitionDelay('header')}
        >
          <a className="profile" href="//www.facebook.com/laxels" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Profile"/>
          </a>
        </header>

        <nav
          className={`main-links ${activePage ? 'page-active' : ''}`}
          style={this.transitionDelay('main-links-container')}
        >
          {PAGES.map(this.mainLink)}
        </nav>

        {PAGES.map(this.page)}

        <nav
          className={`nav-links ${activePage ? '' : 'hidden'}`}
          style={this.transitionDelay('nav')}
        >
          <Link
            to="/"
            className={`nav-link nav-link-animation blue`}
          >
            <span>Home</span>
          </Link>
          {PAGES.map(this.navLink)}
        </nav>

      </div>
    );
  }
}


export default withRouter(App);
