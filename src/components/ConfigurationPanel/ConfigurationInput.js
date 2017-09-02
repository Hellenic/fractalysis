import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ConfigurationInput extends Component {
  state = {
    value: null
  }
  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  handleChange(event) {
    const value = parseFloat(event.target.value)
    this.props.onChange(value);
  }
  // TODO Handle int, float, bool, etc.
  render() {
    const { config } = this.props;
    return (
      <div>
        <h5>{config.label}</h5>
        <input
          type="range"
          value={config.defaultValue || 0}
          min={config.min || 0}
          max={config.max || 5}
          step={config.step || 0.1}
          onChange={e => this.handleChange(e)}
        />
      </div>
    );
  }
}

export default ConfigurationInput;
