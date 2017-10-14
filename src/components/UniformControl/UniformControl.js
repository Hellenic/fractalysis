import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Slider from 'react-precision-slider';
import { getUniformType, getInputTypeForUniform } from '../../utils/uniforms';
import { floatToHex, hexToFloat } from '../../utils/colors';

class UniformControl extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    inputType: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }
  render() {
    const { label, value, defaultValue, onChange, inputType, ...rest } = this.props;
    const uniformType = getUniformType(value);
    let type = inputType;
    if (!type) {
      type = getInputTypeForUniform(uniformType);
    }

    if (type === 'range') {
      return (
        <Slider
          label={label}
          value={value}
          onChange={v => onChange(v)}
          {...rest}
        />
      );
    }
    // Default input types
    else if (['checkbox'].includes(type)) {
      return (
        <div>
          <strong>{label}</strong>
          <input
            type={type}
            checked={value}
            {...rest}
            onChange={e => onChange((e.target.value === 'true'))}
          />
        </div>
      );
    }
    else if (['color'].includes(inputType)) {
      return (
        <div>
          <strong>{label}</strong>
          <input
            type={type}
            value={floatToHex(value)}
            {...rest}
            onChange={e => onChange(hexToFloat(e.target.value))}
          />
        </div>
      );
    }

    // TODO Support for rest of uniform types

    return <span>Unsupported uniform type: {uniformType}</span>;
  }
}

export default UniformControl;
