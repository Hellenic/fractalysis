import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withScene from '../../hocs/withScene';
import { WithSceneProps } from '../../../../types/index';

interface IProps extends WithSceneProps {
  children: any;
}

interface IState {
  prevClientX: number;
  prevClientY: number;
}

class CameraControl extends Component<IProps, IState> {
  static propTypes = {
    children: PropTypes.node
  };
  state = {
    prevClientX: 0,
    prevClientY: 0
  };

  handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.setState({
      prevClientX: event.clientX,
      prevClientY: event.clientY
    });
  }

  handleMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { width, height } = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;
    const { prevClientX, prevClientY } = this.state;

    const offsetX = clientX - prevClientX;
    const offsetY = clientY - prevClientY;

    const moveBy = 0.02; // TODO Read this from configuration.json
    const uniformName = 'cameraPosition'; // TODO Read this from configuration.json
    const uniformValue = this.props.uniforms[uniformName];

    const y = (offsetY / height) * moveBy;
    const x = (offsetX / width) * moveBy;

    const cameraPosition = [
      uniformValue[0] - x,
      uniformValue[1] + y,
      uniformValue[2]
    ];

    this.props.updateUniform(uniformName, cameraPosition);
  }
  render() {
    const { children, ...rest } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, rest)
    );
    return (
      <div
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={e => this.handleMouseUp(e)}
      >
        {childrenWithProps}
      </div>
    );
  }
}

export default withScene(CameraControl);
