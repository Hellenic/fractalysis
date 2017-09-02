import PropTypes from 'prop-types';
import React, { Component } from 'react';

class InputControl extends Component {
  static propTypes = {
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }
  handleChange(event, type) {
    let value = event.target.value;
    const isInt = v => /^-?[0-9]+$/.test(`${v}`);
    if (type === 'range') {
      value = isInt(value) ? parseInt(value, 10) : parseFloat(value);
    }
    else if (type === 'checkbox') {
      value = (value === 'true');
    }

    this.props.onChange(value);
  }
  render() {
    const { type, defaultValue, onChange, ...rest } = this.props;

    // Default input types
    if (['checkbox', 'range'].includes(type)) {
      return (
        <input
          type={type}
          defaultValue={defaultValue}
          {...rest}
          onChange={e => this.handleChange(e, type)}
        />
      );
    }

    // TODO Vector for arrays

    return <span>Unsupported input type: {type}</span>;
  }
}

export default InputControl;
