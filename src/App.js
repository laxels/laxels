import React, { PureComponent } from 'react';
import smoothScroll from 'smoothscroll';
import profile from './profile.jpg';
import './App.css';

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
    return (
      <div
        key={page}
        className={`page ${activePage === page ? 'active' : ''}`}
        style={this.transitionDelay('page', page)}
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mollis dui nec sagittis imperdiet. Quisque pulvinar tempus arcu vitae elementum. Sed pulvinar vestibulum mauris, vestibulum molestie urna vehicula sit amet. Donec in laoreet neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec tincidunt tortor in lacus laoreet bibendum id id magna. Nam at urna hendrerit, condimentum odio ultrices, auctor risus. Curabitur interdum gravida purus, et ornare ex dignissim a. Nulla facilisi. Integer suscipit nunc et diam faucibus, ut auctor sapien auctor. Cras rutrum malesuada nulla eu ultrices. Donec eget mi lacinia, congue nunc ac, sodales quam. Ut a mauris quis nunc feugiat scelerisque. Nulla facilisi.</p>
        <p>Pellentesque vel ante scelerisque, blandit leo non, faucibus erat. Nullam commodo tortor euismod erat laoreet tincidunt. Aliquam vitae enim a diam vulputate pharetra rhoncus eget purus. Donec sit amet commodo eros. Donec id ante a libero porta rutrum et ac ex. Sed sed posuere dui. Sed molestie tristique ullamcorper. Maecenas malesuada diam eros, a facilisis quam venenatis sed.</p>
        <p>Curabitur in lobortis urna. Curabitur at sodales diam. Nulla rhoncus porttitor semper. Nulla facilisi. Nulla facilisi. Duis et magna sed sem blandit auctor. Proin feugiat lacus commodo nibh ultricies lobortis. Nulla consequat eu augue a fermentum. Phasellus fermentum arcu ligula, id interdum dui gravida id. Donec semper tortor sed eros venenatis, id ultricies quam scelerisque. Vivamus sed metus ut quam mollis condimentum id id neque. Nulla sodales, lacus sit amet pulvinar pharetra, ex diam tempor lectus, quis venenatis arcu velit in metus. Proin metus velit, ultricies a erat hendrerit, bibendum maximus lectus. Cras vulputate tellus at nibh lobortis, sit amet mattis libero varius. Suspendisse potenti. Suspendisse tincidunt sollicitudin erat quis iaculis.</p>
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

        <nav
          className={`main-links ${!!activePage ? 'page-active' : ''}`}
          style={this.transitionDelay('main-links-container')}
        >
          {this.pages.map(this.mainLink)}
        </nav>

        <header
          className={`page-header main-link-animation ${!!activePage ? 'inactive' : ''}`}
          style={this.transitionDelay('header')}
        >
          <a className="profile" href="//www.facebook.com/laxels" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Profile"/>
          </a>
        </header>

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
