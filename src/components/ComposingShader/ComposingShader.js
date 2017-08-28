import PropTypes from 'prop-types';
import React, { Component } from 'react';
import superagent from 'superagent';
import GL from 'gl-react';
import fragmentShader from '../../shaders/2d-fs.glsl';

class ComposingShader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  state = {
    shaders: {}
  }
  async componentDidMount() {
    const res = await superagent.get(fragmentShader);
    const shaders = GL.Shaders.create({
      default: {
        frag: res.text
      }
    });
    this.setState({ shaders });
  }
  render() {
    const { shaders } = this.state;
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child => React.cloneElement(child, { shader: shaders.default }));
    return (
      <div>
        {childrenWithProps}
      </div>
    )
  }
}

export default ComposingShader;
