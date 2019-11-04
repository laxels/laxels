import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router';
import smoothScroll from 'smoothscroll';
import Konami from 'konami';
import MainLinks from './MainLinks';
import NavLinks from './NavLinks';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import Transitions from './Transitions';
import profile from './img/profile.jpg';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Detect which page we're on from the URL path
  static getDerivedStateFromProps(props, state) {
    const url = props.location.pathname;
    const page = url.split('/')[1];

    // If it's not s valid page, redirect to home
    if (page && props.pages.indexOf(page) === -1) {
      props.history.replace('/');
      return null;
    }

    if (url !== state.url) {
      return {
        url,
        activePage: page,
        lastActivePage: state.activePage,
      };
    }

    return null;
  }

  componentDidMount() {
    Konami(() => {
      // TODO: Actually do something when Konami Code is triggered
      alert('Konami Code!');
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { activePage } = this.state;
    if (prevState.activePage !== activePage) smoothScroll(0); // Scroll back to top on page change
  }

  // This function returns a style object with a transition-delay property.
  // The property is set depending on the element (links or nav bar or pages) and whether
  // we're switching from home to a page, a page to home, or from a page to another page.
  // This function determines the animation timings of:
  // - The home page links, which are also page headers
  // - The nav bar which appears when not on the home page
  // - The pages (text content below the header)
  transitionDelayFn = (el, pageName) => {
    const { pages } = this.props;
    const { lastActivePage } = this.state;
    let { activePage } = this.state;
    let deactivating, switching;

    if (!activePage) { // Switching from a page to home
      deactivating = true;
      activePage = lastActivePage;
    } else if (activePage && lastActivePage) { // Switching between pages
      switching = true;
    }

    const step = 0.2;
    const duration = 0.6;

    const activePageIndex = pages.indexOf(activePage);
    const lastPageIndex = pages.length - 1;
    const maxDistanceFromActive = Math.max(activePageIndex + 1, lastPageIndex - activePageIndex);
    const distanceFromActive = Math.abs(activePageIndex - pages.indexOf(el));

    const transformDelay = (maxDistanceFromActive - distanceFromActive) * step;
    const flippedTransformDelay = (distanceFromActive - 1) * step;
    const heightDelay = (maxDistanceFromActive - 1) * step + duration;

    if (!deactivating && !switching) { // Switching from home to a page
      if (el === 'main-links-container') return { transitionDelay: `${heightDelay}s` };
      if (el === 'page' || el === 'nav') return { transitionDelay: `${heightDelay + duration}s` };
      return { transitionDelay: `${transformDelay}s, ${heightDelay}s, ${heightDelay}s, ${heightDelay + duration}s, ${heightDelay}s` };
    }

    if (switching) { // Switching between pages
      if (el === 'main-links-container' || el === 'nav') return {};
      if (el === 'page') {
        if (pageName === activePage) return { transitionDelay: `${duration}s, ${duration}s` };
        return { transitionDelay: `0s, ${duration}s` };
      }
      if (el === activePage) return { transitionDelay: `${duration}s` };
      return { transitionDelay: `${duration}s, ${duration}s, ${duration}s, ${duration}s, 0s` };
    }

    // Switching from a page to home
    if (el === 'main-links-container') return { transitionDelay: `${duration}s` };
    if (el === 'page') return { transitionDelay: `0s, ${duration}s` };
    if (el === 'nav') return { transitionDelay: `0s, ${duration}s` };
    return { transitionDelay: `${flippedTransformDelay + 2 * duration}s, ${duration}s, ${duration}s, 0s, 0s` };
  };

  activateTransition = (name) => () => {
    this.setState({ transitionActive: name });
  };

  deactivateTransition = () => {
    this.setState({ transitionActive: undefined });
  };

  activateAboutPage = () => {
    const { history } = this.props;
    const { activePage } = this.state;
    if (activePage !== 'about') history.push('/about');
  };

  render() {
    const { transitionDelayFn, activateTransition, deactivateTransition } = this;
    const { pages, history } = this.props;
    const { activePage, lastActivePage, transitionActive } = this.state;
    const passProps = {
      activePage,
      lastActivePage,
      pages,
      transitionDelayFn,
      history,
      activateTransition,
      deactivateTransition,
    };
    return (
      <Fragment>

        <div
          className={`page-container ${activePage ? 'page-active' : ''} ${transitionActive === 'vault' ? 'vault-transition' : ''}`}
        >

          <header
            className={`page-header main-link-animation ${activePage ? 'inactive' : ''}`}
            style={this.transitionDelayFn('header')}
          >
            <div className="profile" onClick={this.activateAboutPage}>
              <img src={profile} alt="Profile" />
            </div>
          </header>

          <MainLinks {...passProps} />

          <ProjectsPage {...passProps} />
          <AboutPage {...passProps} />
          <ContactPage {...passProps} />

          <NavLinks {...passProps} />

        </div>

        <Transitions active={transitionActive} deactivate={deactivateTransition} />

      </Fragment>
    );
  }
}


export default withRouter(App);
