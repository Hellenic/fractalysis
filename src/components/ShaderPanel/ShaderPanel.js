import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ShaderPanel.css';

class ShaderPanel extends Component {
  static propTypes = {
    configurations: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const { configurations, onChange } = this.props;
    return (
      <aside className="shader-panel" style={{ backgroundColor: '#293742' }}>
        <h2>Choose shaders</h2>
        <hr />
        <section>
          {
            Object.keys(configurations).map(key => {
              const conf = configurations[key];
              return (<button onClick={() => onChange(key)}>{conf.name}</button>);
            })
          }
        </section>
      </aside>
    );
  }
}

export default ShaderPanel;
