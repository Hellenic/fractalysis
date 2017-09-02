import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputControl from '../InputControl/InputControl';

class ConfigurationPane extends Component {
  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    config: {}
  }
  getType(value) {
    switch (typeof value) {
      case "boolean":
        return "checkbox";
      case "number":
        return "range";
      case "object":
        return Array.isArray(value) ? "vector" : null;
      default:
        console.warn(`Unsupported value type for value: ${value}. Add a new type configuration.`);
        return null;
    }
  }
  render() {
    const { label, defaultValue, ...rest } = this.props.config;
    const inputType = this.getType(defaultValue);
    return (
      <div>
        <h5>{label}</h5>
        <InputControl
          type={inputType}
          defaultValue={defaultValue}
          {...rest}
          onChange={v => this.props.onChange(v)}
        />
      </div>
    );
  }
}

export default ConfigurationPane;
