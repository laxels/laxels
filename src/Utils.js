import React, { PureComponent } from 'react';

export const randInt = (i) => Math.floor(Math.random() * i);

// Logic for handling animation (de)activation on mobile.
// Remains active as long as the user is touching the element.
// Deactivates as soon as touch stops.
export const withTouchHover = (Component) => (
  class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      this._unhoverTimeouts = {};
    }

    handleClick = (page) => (
      () => {
        const { activePage, history } = this.props;
        if (activePage !== page) history.push(`/${page}`);
      }
    );

    handleTouchStart = (page) => (
      () => {
        clearTimeout(this._unhoverTimeouts[page]);
        this.setState((prevState) => {
          const newState = { lastTouch: { [page]: Date.now() } };
          if (prevState.unhovered === page) newState.unhovered = undefined;
          return newState;
        });
      }
    );

    handleTouchEnd = (page) => (
      () => {
        const { lastTouch } = this.state;
        const lastTouchForPage = lastTouch[page];
        const now = Date.now();
        if (lastTouchForPage && now - lastTouchForPage < 1000) {
          this._unhoverTimeouts[page] = setTimeout(() => {
            this.setState({ unhovered: page });
          }, 1000 - (now - lastTouchForPage));
        } else this.setState({ unhovered: page });
      }
    );

    render() {
      const { handleClick, handleTouchStart, handleTouchEnd } = this;
      const { unhovered } = this.state;
      const passProps = { handleClick, handleTouchStart, handleTouchEnd, unhovered };
      return (
        <Component {...passProps} {...this.props} />
      );
    }
  }
);
