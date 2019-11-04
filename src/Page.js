import React, { PureComponent } from 'react';

// This class contains logic for the page fade-in / fade-out animations.
// It is used by all of the main pages ('projects', 'about', and 'contact').
class Page extends PureComponent {
  render() {
    const { page, activePage, transitionDelayFn, children } = this.props;
    return (
      <div
        className={`page ${page}-page ${activePage === page ? 'active' : ''}`}
        style={transitionDelayFn('page', page)}
      >
        <div className="page-content">
          {children}
        </div>
      </div>
    );
  }
}

export default Page;
