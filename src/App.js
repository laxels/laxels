import React, { PureComponent } from 'react';
import profile from './profile.jpg';
import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pages = [
    'About',
    'Projects',
    'Contact'
  ]

  pageColors = {
    About: 'green',
    Projects: 'red',
    Contact: 'purple'
  }

  pageLink = (page) => {
    const active = this.state.activePage === page;
    const inactive = !active && !!this.state.activePage;
    return (
      <div
        key={page}
        className={`page-link page-link-animation ${this.pageColors[page]} ${active ? 'active' : ''} ${inactive ? 'inactive' : ''}`}
        onClick={() => this.activatePage(page)}
        style={this.transitionDelay(page)}
      >
        <span>{page}</span>
      </div>
    );
  }

  activatePage = (page) => {
    this.setState({activePage: page});
  }

  transitionDelay = (page) => {
    const {activePage} = this.state;
    if (!activePage || page === activePage) return {};

    const activePageIndex = this.pages.indexOf(activePage);
    const lastPageIndex = this.pages.length - 1;
    const maxDistanceFromActive = Math.max(activePageIndex+1, lastPageIndex-activePageIndex);
    const distanceFromActive = Math.abs(activePageIndex - this.pages.indexOf(page));

    const delay = (maxDistanceFromActive - distanceFromActive) * .25;

    return {transitionDelay: `${delay}s`};
  }

  render() {
    const {activePage} = this.state;
    return (
      <div className="page">
        <header
          className={`page-header page-link-animation ${!!activePage ? 'inactive' : ''}`}
          style={this.transitionDelay('header')}
        >
          <a className="profile" href="//www.facebook.com/laxels" target="_blank" rel="noopener noreferrer">
            <img src={profile} alt="Profile"/>
          </a>
        </header>
        <div className="page-links">
          {this.pages.map(this.pageLink)}
        </div>
      </div>
    );
  }
}

export default App;
