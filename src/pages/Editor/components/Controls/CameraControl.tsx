import PropTypes from 'prop-types';
import { stringify } from 'qs';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

interface IProps extends RouteComponentProps {
  children: any;
  shader: string;
  uniforms: any;
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

  handleChange(value: any, name: string, currentQuery: object) {
    // Push the uniform key-value into the URL
    const queryString = stringify(
      Object.assign({}, currentQuery, {
        [name]: value,
        shader: this.props.shader
      })
    );
    this.props.history.push(`?${queryString}`);
  }

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
    this.handleChange(cameraPosition, uniformName, this.props.uniforms);
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

export default withRouter(CameraControl);
