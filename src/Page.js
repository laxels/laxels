import React, { PureComponent } from 'react';

class Page extends PureComponent {
  render() {
    const {page, activePage, transitionDelayFn, children} = this.props;
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
