import React, { PureComponent } from 'react';

export const withTouchHover = Component => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      this._unhoverTimeouts = {};
    }

    handleClick = (page) => {
      return e => {
        const {activePage, history} = this.props;
        if (activePage !== page) history.push(`/${page}`);
      }
    }

    handleTouchStart = (page) => {
      return e => {
        clearTimeout(this._unhoverTimeouts[page]);
        this.setState(prevState => {
          const newState = {lastTouch: {[page]: Date.now()}};
          if (prevState.unhovered === page) newState.unhovered = undefined;
          return newState;
        });
      }
    }

    handleTouchEnd = (page) => {
      return e => {
        const lastTouch = this.state.lastTouch[page];
        const now = Date.now();
        if (lastTouch && now - lastTouch < 1000) {
          this._unhoverTimeouts[page] = setTimeout(() => {
            this.setState({unhovered: page});
          }, 1000 - (now - lastTouch));
        }
        else this.setState({unhovered: page});
      }
    }

    render() {
      const {handleClick, handleTouchStart, handleTouchEnd} = this;
      const {unhovered} = this.state;
      const passProps = {handleClick, handleTouchStart, handleTouchEnd, unhovered};
      return (
        <Component {...passProps} {...this.props}/>
      );
    }
  }
}
