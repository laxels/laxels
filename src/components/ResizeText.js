import React, { PureComponent } from 'react';
import './ResizeText.css';

class ResizeText extends PureComponent {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = { fontSize: 0 };
  }

  componentDidMount() {
    window.addEventListener('resize', this.refresh);
    this.refresh();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refresh);
  }

  refresh = () => {
    const { fontSize } = this.state;
    const container = this.containerRef.current;
    if (!container) return;

    const { clientWidth: width, clientHeight: height } = container;
    const widthRestricted = Math.round((width - height) / 5.6);
    const heightRestricted = Math.round(height / 4);
    const newFontSize = Math.min(widthRestricted, heightRestricted);
    if (fontSize !== newFontSize) {
      this.setState({ fontSize: newFontSize });
    }
  };

  render() {
    const { children } = this.props;
    const { fontSize } = this.state;
    return (
      <div
        className="resize-text"
        style={{
          height: '100%',
          width: '100%',
          visibility: fontSize ? 'visible' : 'hidden',
        }}
        ref={this.containerRef}
      >
        <span style={{ fontSize, marginTop: Math.round(fontSize / 5) }}>{children}</span>
      </div>
    );
  }
}

export default ResizeText;
