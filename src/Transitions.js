import React, { Fragment, PureComponent } from 'react';
import bomb from './img/bomb.svg';
import boom from './img/boom.png';
import { randInt } from './Utils';
import './Transitions.css';

// This class handles all of the "Over-The-Top Transitions" on the Projects Page.
// TODO: Extract and isolate code for each unique animation
class Transitions extends PureComponent {
  static postScreenColors = [
    '#2D95BF',
    '#F49F5A',
    '#8B78E2',
    '#4AD6B3',
  ];

  constructor(props) {
    super(props);
    const pusheenActions = ['exercise', 'sushi', 'pizza', 'ramen', 'fast-food', 'donut', 'sleep'];
    this.state = { pusheenActions };
    this.ref = React.createRef();
  }

  // Generate a randomly-generated dynamic scrambled puzzle
  static getScrambledPuzzle() {
    const board = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    // Randomly choose 1 out of 9 squares as the initial blank square.
    // x and y represent the position of this blank square on the board.
    const blank = randInt(9);
    let x = blank % 3;
    let y = Math.floor(blank / 3);

    // Starting with the solved image, scramble it by swapping the blank square
    // with one of its neighbors. Each swap is recorded so that the image
    // can be solved later simply by reversing the steps.
    const steps = [];
    let excludedFn;

    // Each one of these functions moves the blank square in a direction,
    // swapping it with its neighbor in said direction.
    // HAX: Each function currently returns its opposite to
    // signal the caller not to go back and forth.
    const up = () => {
      board[y][x] = board[--y][x];
      board[y][x] = blank;
      steps.unshift('down');
      return down;
    };
    const down = () => {
      board[y][x] = board[++y][x];
      board[y][x] = blank;
      steps.unshift('up');
      return up;
    };
    const left = () => {
      board[y][x] = board[y][--x];
      board[y][x] = blank;
      steps.unshift('right');
      return right;
    };
    const right = () => {
      board[y][x] = board[y][++x];
      board[y][x] = blank;
      steps.unshift('left');
      return left;
    };
    const execRandFn = (fns) => {
      const i = fns.indexOf(excludedFn);
      if (i !== -1) fns.splice(i, 1);
      const fn = fns[randInt(fns.length)];
      excludedFn = fn();
    };

    // Randomly move the blank square around, taking care to not go out of bounds.
    const move = () => {
      switch (x) {
        case 0:
          if (y === 0) execRandFn([right, down]);
          else if (y === 2) execRandFn([right, up]);
          else execRandFn([right, up, down]);
          break;
        case 2:
          if (y === 0) execRandFn([left, down]);
          else if (y === 2) execRandFn([left, up]);
          else execRandFn([left, up, down]);
          break;
        default:
          if (y === 0) execRandFn([left, right, down]);
          else if (y === 2) execRandFn([left, right, up]);
          else execRandFn([left, right, up, down]);
      }
    };
    [...Array(10).keys()].map(move); // Trigger the random move 10 times

    return { blank, board, steps };
  }

  static getDerivedStateFromProps({ active }, { postScreenActive, pusheenActions, puzzle }) {
    if (active) {
      const stateChanges = {};
      if (!postScreenActive) {
        stateChanges.postScreenActive = true;
        stateChanges.postScreenColor = Transitions.postScreenColors[randInt(Transitions.postScreenColors.length)];
        stateChanges.pusheenAction = pusheenActions[0];
        if (pusheenActions.length > 1) pusheenActions.shift();
      }
      if (active === 'puzzle' && !puzzle) stateChanges.puzzle = Transitions.getScrambledPuzzle();
      return stateChanges;
    }
    return {
      started: false,
      finished: false,
      progress: undefined,
      puzzle: undefined,
    };
  }

  // Execute state changes required to kick off each animation
  // TODO: Rework to eliminate anti-pattern of calling setState from componentDidUpdate
  componentDidUpdate() {
    const { active, deactivate } = this.props;
    const { started, finished } = this.state;

    if (!active) return;

    if (active === 'wall') {
      if (!started) {
        this.setState({ started: true, progress: 0 });
        return;
      }

      const { progress } = this.state;
      if (!finished) {
        if (progress !== undefined && progress < 100) {
          const inc = randInt(26) + 25;
          setTimeout(() => this.setState((prevState) => ({ progress: Math.min(100, prevState.progress + inc) })), 500);
        } else if (!this._finishTimeout && progress === 100) {
          this._finishTimeout = setTimeout(() => this.setState({ finished: true }), 500);
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
    } else if (active === 'puzzle') {
      if (!started) {
        this.setState({ started: true });
        return;
      }

      const { puzzle: { steps } } = this.state;
      if (!finished) {
        if (steps.length) {
          setTimeout(() => this.setState(({ puzzle }) => {
            if (puzzle.steps && puzzle.steps.length) {
              this[puzzle.steps[0]]();
              puzzle.steps.shift();
              return { puzzle: { ...puzzle } };
            }
            return {};
          }), 150);
        } else if (!this._finishTimeout) {
          this._finishTimeout = setTimeout(() => this.setState({ finished: true }), 150);
        }
        return;
      }

      if (!this._deactivateTimeout) {
        this._deactivateTimeout = setTimeout(() => {
          deactivate();
          delete this._deactivateTimeout;
          delete this._finishTimeout;
        }, 700);
      }
    } else if (active === 'vault') {
      if (!started) {
        this.setState({ started: true, progress: 0 });
        return;
      }

      const { progress } = this.state;
      if (!finished) {
        if (progress !== undefined && progress < 100) {
          setTimeout(() => this.setState((prevState) => ({ progress: Math.min(100, prevState.progress + 1) })), 20);
        } else if (progress === 100) {
          this.setState({ finished: true });
        }
        return;
      }

      if (!this._deactivateTimeout) {
        this._deactivateTimeout = setTimeout(() => {
          deactivate();
          delete this._deactivateTimeout;
        }, 1750);
      }
    }
  }

  getScreenStyle = () => {
    const screen = this.ref.current;
    if (!screen) return {};

    const { active } = this.props;
    const { started, finished } = this.state;

    if (active === 'wall') {
      if (finished) return { opacity: 0, transition: 'opacity 2s .5s' };
    }

    if (active === 'puzzle') {
      const style = { background: 'black' };

      if (!started) {
        style.opacity = 0;
      } else if (!finished) {
        style.transition = 'opacity .5s';
      } else {
        style.opacity = 0;
        style.transition = 'opacity .5s .2s';
      }
      return style;
    }

    return {};
  };


  /*
   * EXPLODING WALL TRANSITION
   */

  getWallPieceStyle = (i) => {
    const wall = this.ref.current;
    if (!wall) return { display: 'none' };
    const { started, finished } = this.state;
    const style = {},
      w = wall.offsetWidth,
      h = wall.offsetHeight,
      pw = w / 8,
      ph = h / 8;

    if ((i + 1) % 8 !== 0) style.left = `${(i % 8) * 12.5}%`;
    else style.right = 0;
    if (i < 56) style.top = `${Math.floor(i / 8) * 12.5}%`;
    else style.bottom = 0;

    style.backgroundPosition = `-${Math.round((i % 8) * pw)}px -${Math.round(Math.floor(i / 8) * ph)}px`;

    style.transition = 'transform .7s';

    if (!started) {
      let translateX = Math.ceil(w / 2);
      if (i % 8 < 4) translateX *= -1;
      style.transform = `translate3d(${translateX}px, 0, 0)`;
      delete style.transition;
    } else if (finished) {
      const r = (m) => {
        let x = Math.random() * (m || 1);
        if (Math.random() < 0.5) x = -x;
        return x;
      };
      const rotation = `rotate3d(${r()}, ${r()}, ${r()}, ${(Math.random() + 1) / 2}turn)`;
      const translation = `translate3d(${r(100)}px, ${r(100)}px, ${r(100)}px)`;
      style.transform = `${rotation} ${translation}`;
      style.transition = 'transform 2s linear';
    }

    return style;
  };

  generateWallPiece = (i) => <div key={i} className="wall-piece" style={this.getWallPieceStyle(i)} />;

  getBombStyle = () => {
    const wall = this.ref.current;
    if (!wall) return { display: 'none' };
    const { started } = this.state;
    const style = {},
      h = wall.offsetHeight;

    if (!started) style.transform = `translate3d(0, ${-h}px, 0)`;

    return style;
  };


  /*
   * PUZZLE TRANSITION
   */

  getPuzzleStyle = () => {
    const screen = this.ref.current;
    if (!screen) return { display: 'none' };

    const side = Math.min(screen.offsetWidth, screen.offsetHeight);
    return { width: side, height: side };
  };

  up = () => {
    const { puzzle: { blank, board } } = this.state;
    const { x, y } = this.getPosFromBoard(blank);
    board[y][x] = board[y - 1][x];
    board[y - 1][x] = blank;
  };

  down = () => {
    const { puzzle: { blank, board } } = this.state;
    const { x, y } = this.getPosFromBoard(blank);
    board[y][x] = board[y + 1][x];
    board[y + 1][x] = blank;
  };

  left = () => {
    const { puzzle: { blank, board } } = this.state;
    const { x, y } = this.getPosFromBoard(blank);
    board[y][x] = board[y][x - 1];
    board[y][x - 1] = blank;
  };

  right = () => {
    const { puzzle: { blank, board } } = this.state;
    const { x, y } = this.getPosFromBoard(blank);
    board[y][x] = board[y][x + 1];
    board[y][x + 1] = blank;
  };

  getPosFromBoard = (i) => {
    const { puzzle: { board } } = this.state;
    let x, y;
    board.every((row, yPos) => {
      const xPos = row.indexOf(i);
      if (xPos !== -1) {
        x = xPos;
        y = yPos;
        return false;
      }
      return true;
    });
    return { x, y };
  };

  getPuzzleSqStyle = (i) => {
    const screen = this.ref.current;
    if (!screen) return { display: 'none' };

    const { width, height } = this.getPuzzleStyle();
    const style = {},
      w = width,
      h = height,
      sw = w / 3,
      sh = h / 3;

    const { x, y } = this.getPosFromBoard(i);
    style.left = `${x * 33.3333}%`;
    style.top = `${y * 33.3333}%`;

    style.backgroundSize = `${w}px ${h}px`;
    style.backgroundPosition = `-${Math.round((i % 3) * sw)}px -${Math.round(Math.floor(i / 3) * sh)}px`;

    return style;
  };

  generatePuzzleSq = (i) => {
    const { puzzle: { blank } } = this.state;
    return (
      <div key={i} className={`puzzle-sq ${i === blank ? 'blank' : ''}`} style={this.getPuzzleSqStyle(i)} />
    );
  };


  /*
   * VAULT TRANSITION
   */

  getVaultBGStyle = () => {
    const screen = this.ref.current;
    if (!screen) return {};

    const side = Math.round(Math.min(screen.offsetWidth, screen.offsetHeight) * 0.6);
    return { width: side, height: side };
  };

  getDoorStyle = () => {
    const screen = this.ref.current;
    if (!screen) return {};

    const side = Math.round(Math.min(screen.offsetWidth, screen.offsetHeight) * 0.75);
    return { width: side, height: side };
  };

  getSpanStyle = () => {
    const screen = this.ref.current;
    if (!screen) return {};

    const side = Math.min(screen.offsetWidth, screen.offsetHeight);
    const fs = 0.05 * side;
    const fontSize = Math.round(fs);
    const lineHeight = `${Math.round(1.25 * fs)}px`;
    const paddingTop = Math.round(0.3125 * fs);
    const height = Math.round(1.5625 * fs);
    return { fontSize, lineHeight, paddingTop, height };
  };


  deactivatePostScreen = () => {
    this.setState({ postScreenActive: false });
  };

  render() {
    const { active } = this.props;
    const { started, progress, finished, postScreenActive, postScreenColor, pusheenAction } = this.state;
    return (
      <Fragment>
        <div
          className={`transition-screen ${active ? 'active' : ''} ${started ? 'started' : ''} ${finished ? 'finished' : ''}`}
          style={this.getScreenStyle()}
          ref={this.ref}
        >
          {active === 'wall' && (
            <div className="wall">
              {[...Array(64).keys()].map(this.generateWallPiece)}
              <img className="bomb" src={bomb} alt="bomb" style={this.getBombStyle()} />
              <div className="fuse-wrap" style={this.getBombStyle()}>
                <div className="fuse" style={{ height: `${100 - progress}%` }} />
              </div>
              <img className="boom" src={boom} alt="boom" />
            </div>
          )}

          {active === 'puzzle' && (
            <div className="puzzle" style={this.getPuzzleStyle()}>
              {[...Array(9).keys()].map(this.generatePuzzleSq)}
            </div>
          )}

          {active === 'vault' && (
            <div className="vault">
              <div className="bg" style={this.getVaultBGStyle()} />
              <div className="door" style={this.getDoorStyle()}>
                <span style={this.getSpanStyle()}>{`${progress}%`}</span>
              </div>
            </div>
          )}
        </div>

        <div
          className={`post-transition-wrap ${active === 'vault' ? 'vault-transition' : ''} ${postScreenActive ? 'active' : ''}`}
          onClick={this.deactivatePostScreen}
        >
          <div className="post-transition-screen" style={{ backgroundColor: postScreenColor }}>
            <div className="content">
              <div className={`pusheen ${pusheenAction}`} />
              <p>Click or tap to go back</p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Transitions;
