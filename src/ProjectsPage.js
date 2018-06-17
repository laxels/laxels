import React, { PureComponent } from 'react';
import Page from './Page';
import './ProjectsPage.css';


class ProjectsPage extends PureComponent {
  render() {
    const {activateTransition} = this.props;
    return (
      <Page page="projects" {...this.props}>
        <p>My latest project is this personal site, which is done in Vanilla React without any animation libraries. Try hovering over or touching the page headers / links on the home page!</p>

        <h2>Websites</h2>
        <div className="websites">
          <a className="website crowdmed" href="https://www.crowdmed.com/" target="_blank" rel="noopener noreferrer">
            <span>CrowdMed</span>
          </a>
          <a className="website gawpoe" href="https://www.gawpoe.com/" target="_blank" rel="noopener noreferrer">
            <span>Gaw | Poe LLP</span>
          </a>
          <a className="website amydis" href="https://www.amydis.com/" target="_blank" rel="noopener noreferrer">
            <span>Amydis</span>
          </a>
          <a className="website buypower" href="https://www.buypower.ng/" target="_blank" rel="noopener noreferrer">
            <span>BuyPower</span>
          </a>
        </div>

        <h2>Over-The-Top Transitions</h2>
        <p>You probably wouldn't use these transition animations. They were quite fun to make, though. ;)</p>
        <p>Made with pure HTML/CSS/JS (Canvas-free!) from scratch without any animation libraries.</p>
        <p>Click on any one of these links to see it in action:</p>
        <p><a onClick={activateTransition('wall')}>Exploding Wall</a></p>
        <p><a onClick={activateTransition('puzzle')}>Sliding Puzzle</a></p>
        <p><a onClick={activateTransition('vault')}>Vault Door</a></p>

        <h2>Battle Network Arena</h2>
        <p>A very early-stage recreation of the battle system in Capcom's <a href="https://en.wikipedia.org/wiki/Mega_Man_Battle_Network" target="_blank" rel="noopener noreferrer">Mega Man Battle Network</a> series. Done fully in JavaScript using WebGL/Canvas. Online play planned for the distant future.</p>
        <p><a href="https://bn-arena.herokuapp.com" target="_blank" rel="noopener noreferrer">Check it out here!</a> (Touch devices not yet supported)</p>
        <p>Release date: TBD (probably after Universal Basic Income is instated)</p>

        {/*
        <h2>Reinventing The Wheel</h2>
        <p>Just for additional practice.</p>
        <p><a href="https://github.com/laxels/password-strength" target="_blank" rel="noopener noreferrer">Password strength meter</a></p>
        <p><a href="https://github.com/laxels/select" target="_blank" rel="noopener noreferrer">Styled selects</a></p>
        <p><a href="https://github.com/laxels/overlay" target="_blank" rel="noopener noreferrer">Overlay</a></p>
        <p><a href="https://github.com/laxels/autocomplete" target="_blank" rel="noopener noreferrer">Autocomplete</a></p>
        */}
      </Page>
    );
  }
}


export default ProjectsPage;
