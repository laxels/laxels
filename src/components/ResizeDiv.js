import React, { PureComponent } from 'react';

class ResizeDiv extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { fontSize: ResizeDiv.getFontSize() };
  }

  static getFontSize() {
    const { clientWidth: width, clientHeight: bodyHeight } = document.body;
    const height = (bodyHeight - 170) / 3;
    const widthRestricted = Math.round((width - height) / 5.6);
    const heightRestricted = Math.round(height / 4);
    return Math.min(widthRestricted, heightRestricted);
  }

  componentDidMount() {
    window.addEventListener('resize', this.refresh);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.refresh);
  }

  refresh = () => {
    const { fontSize } = this.state;
    const newFontSize = ResizeDiv.getFontSize();
    if (fontSize !== newFontSize) {
      this.setState({ fontSize: newFontSize });
    }
  };

  render() {
    const { children, style, ...passProps } = this.props;
    const { fontSize } = this.state;
    return (
      <div
        style={{
          ...style,
          ...{ fontSize },
        }}
        {...passProps}
      >
        {children}
      </div>
    );
  }
}

export default ResizeDiv;
