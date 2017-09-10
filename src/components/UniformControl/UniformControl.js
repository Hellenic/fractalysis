import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from 'react-precision-slider';
import { getUniformType, getInputTypeForUniform } from '../../utils/uniforms';

class UniformControl extends Component {
  static propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const { label, defaultValue, onChange, ...rest } = this.props;
    const uniformType = getUniformType(defaultValue);
    const inputType = getInputTypeForUniform(uniformType);

    if (inputType === 'range') {
      return (
        <Slider
          label={label}
          defaultValue={defaultValue}
          onChange={v => onChange(v)}
          {...rest}
        />
      );
    }
    // Default input types
    else if (['checkbox'].includes(inputType)) {
      return (
        <div>
          <strong>{label}</strong>
          <input
            type={inputType}
            defaultValue={defaultValue}
            {...rest}
            onChange={e => onChange((e.target.value === 'true'))}
          />
        </div>
      );
    }

    // TODO Support for rest of uniform types

    return <span>Unsupported uniform type: {uniformType}</span>;
  }
}

export default UniformControl;
