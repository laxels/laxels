import React, { PureComponent } from 'react';
import bomb from './img/bomb.svg';
import boom from './img/boom.png';
import './Transitions.css';

class Transitions extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.wallRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.active && state.progress === undefined) return {progress: 0};
    if (!props.active) return {progress: undefined, finished: false};
    return null;
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    const {deactivate} = this.props;
    const {progress, finished} = this.state;

    if (finished) {
      if (!this._deactivateTimeout) {
        this._deactivateTimeout = setTimeout(() => {
          deactivate();
          delete this._deactivateTimeout;
          delete this._finishTimeout;
        }, 2500);
      }
      return;
    }

    if (progress !== undefined && progress < 100) {
      const inc = Math.floor(Math.random()*40)+1;
      setTimeout(() => this.setState({progress: Math.min(100, progress+inc)}), 500);
    }
    else if (!this._finishTimeout && progress === 100) {
      this._finishTimeout = setTimeout(() => this.setState({finished: true}), 500);
    }
  }

  getWallPieceStyle = i => {
    const wall = this.wallRef.current;
    if (!wall) return {display: 'none'};
    const {active} = this.props;
    const {finished} = this.state;
    const style = {}, w = wall.offsetWidth, h = wall.offsetHeight, pw = w/8, ph = h/8;

    if ((i+1) % 8 !== 0) style.left = `${(i%8) * 12.5}%`;
    else style.right = 0;
    if (i < 56) style.top = `${Math.floor(i/8) * 12.5}%`;
    else style.bottom = 0;

    style.backgroundPosition = `-${Math.round((i%8)*pw)}px -${Math.round(Math.floor(i/8)*ph)}px`;

    style.transition = 'transform .7s';

    if (!active) {
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
    const wall = this.wallRef.current;
    if (!wall) return {display: 'none'};
    const {active} = this.props;
    const style = {}, h = wall.offsetHeight;

    if (!active) style.transform = `translate3d(0, ${-h}px, 0)`;

    return style;
  }

  render() {
    const {active} = this.props;
    const {progress, finished} = this.state;
    return (
      <div
        className={`transition-screen ${active ? 'active' : ''} ${finished ? 'finished' : ''}`}
      >
        <div className="wall" ref={this.wallRef}>
          {[...Array(64).keys()].map(this.generateWallPiece)}
          <img className="bomb" src={bomb} alt="bomb" style={this.getBombStyle()}/>
          <div className="fuse-wrap" style={this.getBombStyle()}>
            <div className="fuse" style={{height: `${100 - progress}%`}}/>
          </div>
          <img className="boom" src={boom} alt="boom"/>
        </div>
      </div>
    )
  }
}

export default Transitions;
