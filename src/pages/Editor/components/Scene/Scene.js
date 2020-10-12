import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withScene from '../../hocs/withScene';

class Scene extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children, shader, uniforms } = this.props;

    // Pass the props to children and render
    const childProps = {
      width: window.innerWidth,
      height: window.innerHeight,
      shader,
      uniforms
    };
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, childProps)
    );
    return <div>{childrenWithProps}</div>;
  }
}

export default withScene(Scene);
