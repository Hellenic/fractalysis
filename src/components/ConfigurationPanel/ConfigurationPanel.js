import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ConfigurationPanel.css';

class ConfigurationPanel extends Component {
  state = {
    power: 2.0,
    bailout: 11.1
  }
  static propTypes = {
    uniforms: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  // TODO Uniform type handling (int, float, bool, ...)
  handleChange(e, name) {
    this.setState({
      [name]: parseFloat(e.target.value)
    });
    this.props.onChange(this.state);
  }
  renderSettings() {
    const { uniforms } = this.props;
    return Object.keys(uniforms).map(key => {
      const config = uniforms[key];
      return (
        <div key={`uniform-${key}`}>
          <h5>{config.label}</h5>
          <input
            type="range"
            value={this.state[key]}
            min={config.min || 0}
            max={config.max || 5}
            step={config.step || 0.1}
            onChange={e => this.handleChange(e, key)}
          />
        </div>
      )
    })
  }
  render() {
    const { uniforms } = this.props;
    return (
      <aside className="panel" style={{ backgroundColor: '#293742' }}>
        <h2>Settings</h2>
        <hr />
        <section>
          { uniforms ? this.renderSettings() : 'Waiting for configurations...' }
        </section>
      </aside>
    );
  }
}

export default ConfigurationPanel;
