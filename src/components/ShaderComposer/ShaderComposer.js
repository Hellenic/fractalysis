import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Colors } from "@blueprintjs/core";
import './ShaderComposer.css';

class ShaderComposer extends Component {
  static propTypes = {
    shaders: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <aside className="shader-panel" style={{ backgroundColor: Colors.DARK_GRAY3 }}>
        <h2>Choose shaders</h2>
        <hr />
        <section>
          <Button onClick={() => this.props.onChange('default2d')}>2D</Button>
          <Button onClick={() => this.props.onChange('default3d')}>3D</Button>
        </section>
      </aside>
    );
  }
}

export default ShaderComposer;
