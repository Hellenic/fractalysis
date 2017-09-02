import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUniformType, getInputTypeForUniform } from '../../utils/uniforms';

class UniformControl extends Component {
  static propTypes = {
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
    const { defaultValue, onChange, ...rest } = this.props;
    const uniformType = getUniformType(defaultValue);
    const inputType = getInputTypeForUniform(uniformType);

    // Default input types
    if (['checkbox', 'range'].includes(inputType)) {
      return (
        <input
          type={inputType}
          defaultValue={defaultValue}
          {...rest}
          onChange={e => this.handleChange(e, inputType)}
        />
      );
    }

    // TODO Support for rest of uniform types

    return <span>Unsupported uniform type: {uniformType}</span>;
  }
}

export default UniformControl;
