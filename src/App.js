import React, { PureComponent } from 'react';
import { withRouter } from 'react-router';
import smoothScroll from 'smoothscroll';
import Konami from 'konami';
import MainLinks from './MainLinks';
import NavLinks from './NavLinks';
import ProjectsPage from './ProjectsPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import profile from './img/profile.jpg';
import './App.css';


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
    if (page && props.pages.indexOf(page) === -1) {
      props.history.replace('/');
      return null;
    }
    if (url !== state.url) return {url: url, activePage: page, lastActivePage: state.activePage};
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activePage !== this.state.activePage) smoothScroll(0);
  }

  transitionDelayFn = (el, page) => {
    const {pages} = this.props;
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

    const activePageIndex = pages.indexOf(activePage);
    const lastPageIndex = pages.length - 1;
    const maxDistanceFromActive = Math.max(activePageIndex+1, lastPageIndex-activePageIndex);
    const distanceFromActive = Math.abs(activePageIndex - pages.indexOf(el));

    const transformDelay = (maxDistanceFromActive - distanceFromActive) * step;
    const flippedTransformDelay = (distanceFromActive-1) * step;
    const heightDelay = (maxDistanceFromActive-1) * step + duration;

    if (!deactivating && !switching) {
      if (el === 'main-links-container') return {transitionDelay: `${heightDelay}s`};
      if (el === 'page' || el === 'nav') return {transitionDelay: `${heightDelay+duration}s`};
      return {transitionDelay: `${transformDelay}s, ${heightDelay}s, ${heightDelay}s, ${heightDelay+duration}s, ${heightDelay}s`};
    }
    else if (switching) {
      if (el === 'main-links-container' || el === 'nav') return {};
      if (el === 'page') {
        if (page === activePage) return {transitionDelay: `${duration}s, ${duration}s`};
        else return {transitionDelay: `0s, ${duration}s`}
      }
      if (el === activePage) return {transitionDelay: `${duration}s`};
      else return {transitionDelay: `${duration}s, ${duration}s, ${duration}s, ${duration}s, 0s`};
    }
    else {
      if (el === 'main-links-container') return {transitionDelay: `${duration}s`};
      if (el === 'page') return {transitionDelay: `0s, ${duration}s`};
      if (el === 'nav') return {transitionDelay: `0s, ${duration}s`};
      return {transitionDelay: `${flippedTransformDelay+2*duration}s, ${duration}s, ${duration}s, 0s, 0s`};
    }
  }

  render() {
    const {transitionDelayFn} = this;
    const {pages, pageColors} = this.props;
    const {activePage, lastActivePage} = this.state;
    const passProps = {activePage, lastActivePage, pages, pageColors, transitionDelayFn};
    return (
      <div className={`page-container ${activePage ? 'page-active' : ''}`}>

        <header
          className={`page-header main-link-animation ${activePage ? 'inactive' : ''}`}
          style={this.transitionDelayFn('header')}
        >
          <a className="profile" href="//www.facebook.com/laxels" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Profile"/>
          </a>
        </header>

        <MainLinks {...passProps}/>

        <ProjectsPage {...passProps}/>
        <AboutPage {...passProps}/>
        <ContactPage {...passProps}/>

        <NavLinks {...passProps}/>

      </div>
    );
  }
}


export default withRouter(App);
