import React, { PureComponent } from 'react';
import Page from './Page';


class ProjectsPage extends PureComponent {
  render() {
    const {activateTransition} = this.props;
    return (
      <Page page="projects" {...this.props}>
        <h2>Over-The-Top Transitions</h2>
        <p>You probably wouldn't use these transition animations. They were quite fun to make, though. ;)</p>
        <p>Made with pure HTML/CSS/JS (Canvas-free!).</p>
        <p><a onClick={activateTransition('wall')}>Exploding Wall</a></p>
        <p><a onClick={activateTransition('puzzle')}>Sliding Puzzle</a></p>
        {/*<p><a onClick={activateTransition('vault')}>Vault Door</a></p>*/}

        {/*
        <p><a href="https://bn-arena.herokuapp.com" target="_blank" rel="noopener noreferrer">Battle Network Arena</a></p>
        <p><a href="https://chrome.google.com/webstore/detail/haunted-by-poyo/jcdbalpjodfkfogbhhfpldijbnnmpbpc" target="_blank" rel="noopener noreferrer">Haunted By Poyo</a></p>
        */}

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
