import React, { PureComponent } from 'react';
import bomb from './img/bomb.svg';
import boom from './img/boom.png';
import './Transitions.css';

class Transitions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.active) return {started: false, progress: undefined, finished: false};
    return null;
  }

  componentDidUpdate() {
    const {active, deactivate} = this.props;
    const {started, progress, finished} = this.state;

    if (!active) return;

    if (!started) return this.setState({started: true, progress: 0});

    if (!finished) {
      if (progress !== undefined && progress < 100) {
        const inc = Math.floor(Math.random()*40)+1;
        setTimeout(() => this.setState({progress: Math.min(100, progress+inc)}), 500);
      }
      else if (!this._finishTimeout && progress === 100) {
        this._finishTimeout = setTimeout(() => this.setState({finished: true}), 500);
      }
      return;
    }

    if (!this._deactivateTimeout) {
      this._deactivateTimeout = setTimeout(() => {
        deactivate();
        delete this._deactivateTimeout;
        delete this._finishTimeout;
      }, 2500);
    }

  }

  getWallPieceStyle = i => {
    const wall = this.ref.current;
    if (!wall) return {display: 'none'};
    const {started, finished} = this.state;
    const style = {}, w = wall.offsetWidth, h = wall.offsetHeight, pw = w/8, ph = h/8;

    if ((i+1) % 8 !== 0) style.left = `${(i%8) * 12.5}%`;
    else style.right = 0;
    if (i < 56) style.top = `${Math.floor(i/8) * 12.5}%`;
    else style.bottom = 0;

    style.backgroundPosition = `-${Math.round((i%8)*pw)}px -${Math.round(Math.floor(i/8)*ph)}px`;

    style.transition = 'transform .7s';

    if (!started) {
      let translateX = Math.ceil(w/2);
      if (i % 8 < 4) translateX *= -1;
      style.transform = `translate3d(${translateX}px, 0, 0)`;
      delete style.transition;
    }
    else if (finished) {
      const r = m => {
        let x = Math.random() * (m || 1);
        if (Math.random() < .5) x = -x;
        return x;
      }
      const rotation = `rotate3d(${r()}, ${r()}, ${r()}, ${(Math.random()+1)/2}turn)`;
      const translation = `translate3d(${r(100)}px, ${r(100)}px, ${r(100)}px)`;
      style.transform = `${rotation} ${translation}`;
      style.transition = 'transform 2s linear';
    }

    return style;
  }
  generateWallPiece = i => {
    return (
      <div key={i} className="wall-piece" style={this.getWallPieceStyle(i)}/>
    );
  }

  getBombStyle = () => {
    const wall = this.ref.current;
    if (!wall) return {display: 'none'};
    const {started} = this.state;
    const style = {}, h = wall.offsetHeight;

    if (!started) style.transform = `translate3d(0, ${-h}px, 0)`;

    return style;
  }

  render() {
    const {active} = this.props;
    const {started, progress, finished} = this.state;
    return (
      <div
        className={`transition-screen ${active ? 'active' : ''} ${started ? 'started' : ''} ${finished ? 'finished' : ''}`}
        ref={this.ref}
      >
        {active === 'wall' && (
          <div className="wall">
            {[...Array(64).keys()].map(this.generateWallPiece)}
            <img className="bomb" src={bomb} alt="bomb" style={this.getBombStyle()}/>
            <div className="fuse-wrap" style={this.getBombStyle()}>
              <div className="fuse" style={{height: `${100 - progress}%`}}/>
            </div>
            <img className="boom" src={boom} alt="boom"/>
          </div>
        )}

        {active === 'puzzle' && (
          <div className="puzzle">
          </div>
        )}

        {active === 'vault' && (
          <div className="vault">
          </div>
        )}
      </div>
    )
  }
}

export default Transitions;
