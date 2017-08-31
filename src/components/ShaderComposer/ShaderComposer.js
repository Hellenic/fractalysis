import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ShaderComposer.css';

class ShaderComposer extends Component {
  static propTypes = {
    configurations: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  render() {
    return (
      <aside className="shader-panel" style={{ backgroundColor: '#293742' }}>
        <h2>Choose shaders</h2>
        <hr />
        <section>
          <button onClick={() => this.props.onChange('default2D')}>2D</button>
          <button onClick={() => this.props.onChange('default3D')}>3D</button>
        </section>
      </aside>
    );
  }
}

export default ShaderComposer;
